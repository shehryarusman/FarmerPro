import React, { useRef, useEffect, useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
//import {v4} from 'uuid'; //for unpredictable filenames
import axios from "axios";
import "../Disease.css";

function DiseaseClassifier() {
  const videoRef = useRef(null);
  const photoRef = useRef(null); //canvas

  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300, height: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video
          .play()
          .then(() => {
            console.log("Video started successfully");
          })
          .catch((playbackError) => {
            console.error("Error starting video playback:", playbackError);
          });
      })
      .catch((error) => {
        console.error("Error accessing the camera:", error);
      });
  };

  const takePhoto = () => {
    const width = 300;
    const height = 300;
    let video = videoRef.current;
    let photo = photoRef.current;
    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

    setHasPhoto(true);
  };

  const uploadPhoto = () => {
    const imageRef = ref(storage, `images/capture.png`);
    let photo = photoRef.current;

    // Convert Data URL to Blob
    const dataURLToBlob = (dataURL) => {
      const byteString = window.atob(dataURL.split(",")[1]);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }
      return new Blob([uint8Array], { type: "image/png" });
    };

    const imageBlob = dataURLToBlob(photo.toDataURL("image/png"));

    uploadBytes(imageRef, imageBlob)
      .then(() => {
        alert("image uploaded");
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const [imageUpload, setimageUpload] = useState(null);

  const handleUpload = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("image uploaded");
    });
  };

  const triggerModelDetection = async () => {
    try {
      // Define the URL of your Flask server
      const url = "http://127.0.0.1:5000/api/classifydisease";

      // Define the data you want to send in your POST request
      const data = {
        runmodel: true,
      };

      // Make a POST request using axios
      const response = await axios.post(url, data);

      // Handle the response from the server
      console.log("Response:", response.data);
      let class_type = response.data.class;
      let value = Math.round(response.data.percentage * 100 * 100) / 100;

      document.getElementById("Class_Out").innerText =
        class_type + ": " + value + "%";
    } catch (error) {
      // Handle errors in making the request or processing the response
      console.error("Error:", error);
    }
  };

  return (
    <div className="disease-classifier-container">
      <header className="disease-classifier-header">
        <div className="camera-container">
          <video className="video-display" ref={videoRef}></video>
          <button className="button-primary" onClick={takePhoto}>
            Take Picture
          </button>
        </div>

        <div className={"result-container" + (hasPhoto ? " hasPhoto" : "")}>
          <canvas className="canvas-display" ref={photoRef}></canvas>
          <button className="button-primary" onClick={uploadPhoto}>
            Upload Photo
          </button>
          <button className="button-primary" onClick={closePhoto}>
            Close
          </button>
        </div>

        <input
          onChange={(e) => {
            setimageUpload(e.target.files[0]);
          }}
          type="file"
          className="file-input"
        />
        <button className="button-primary" onClick={handleUpload}>
          Upload File
        </button>

        <button className="button-primary" onClick={triggerModelDetection}>
          Classify Vegetable
        </button>
        <div id="Class_Out" className="class-output"></div>
      </header>
    </div>
  );
}

export default DiseaseClassifier;
