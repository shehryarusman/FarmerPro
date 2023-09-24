import React, { useRef, useEffect, useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
import "../Disease.css";

function DiseaseClassifier() {
  const videoRef = useRef(null);
  const photoRef = useRef(null); //canvas

  const [hasPhoto, setHasPhoto] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

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

  const handleUpload = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("image uploaded");
    });
  };

  const triggerModelDetection = () => {
    try {
      // Define the URL of your Flask server
      const url = "https://127.0.0.1:5000/api/classifyDisease";

      const apiUrl = `${url}?runmodel=True`;

      // Make a POST request using the fetch API
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.class, data.percentage);
          setApiResponse(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      // Handle errors in making the request or processing the response
      console.error("Error:", error);
    }
  };

  const renderCropInformation = () => {
    if (apiResponse && apiResponse.class && apiResponse.percentage) {
      return (
        <div className="crop-info-box">
          <h2>Crop Information</h2>
          <ul className="render-crop">
            <li>Class: {apiResponse.class}</li>
            <li>
              Percentage: {Math.round(apiResponse.percentage * 100 * 100) / 100}
            </li>
          </ul>
        </div>
      );
    }
  };
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className="disease-classifier-container">
      <header className="disease-classifier-header">
        <div className="horizontal-camera">
          <div className="camera-container">
            <video ref={videoRef} className="video-display"></video>
            <button onClick={takePhoto} className="button-primary">
              Take Picture
            </button>
          </div>

          <div className={"result-container" + (hasPhoto ? " hasPhoto" : "")}>
            <canvas ref={photoRef} className="photo-display"></canvas>
            <button onClick={uploadPhoto} className="button-primary">
              Upload Photo
            </button>
            <button onClick={closePhoto} className="button-primary">
              Close
            </button>
          </div>
        </div>

        <div className="horizontal-layout">
          <input
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
            type="file"
            className="file-input"
          />
          <button onClick={handleUpload} className="button-primary">
            Upload File
          </button>
          <button onClick={triggerModelDetection} className="button-primary">
            Classify Vegetable
          </button>
        </div>
      </header>
      {renderCropInformation()}
    </div>
  );
}

export default DiseaseClassifier;
