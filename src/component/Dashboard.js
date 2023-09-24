import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../Dashboard.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

function Dashboard() {
  const [markerPosition, setMarkerPosition] = useState([39.9566, -75.1899]);
  const [apiResponse, setApiResponse] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(markerPosition[0]);
  const [currentLongitude, setCurrentLongitude] = useState(markerPosition[1]);

  const handleMarkerMove = (e) => {
    const { lat, lng } = e.target.getLatLng();
    setCurrentLatitude(lat);
    setCurrentLongitude(lng);
    setMarkerPosition([lat, lng]);
  };

  const callApiWithLatLong = () => {
    const latitude = markerPosition[0];
    const longitude = markerPosition[1];

    const apiName = "predict";
    const apiUrl = `https://127.0.0.1:5000/${apiName}?latitude=${latitude}&longitude=${longitude}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setApiResponse(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const renderCropInformation = () => {
    if (apiResponse && apiResponse.cropSpecific) {
      return Object.entries(apiResponse.cropSpecific).map(([crop, info]) => (
        <div key={crop}>
          <h2>{crop}</h2>
          <ol>
            {info.split("\n").map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      ));
    } else {
      return <p>No crop data available.</p>;
    }
  };

  const renderRotationTable = () => {
    if (apiResponse && apiResponse.rotationTxt) {
      const rotationData = apiResponse.rotationTxt;
      console.log("rotationData", rotationData);
      const myArray = rotationData.split(/[,\n]+/);
      console.log("myArray", myArray);

      return (
            <ul>
              {myArray.map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
      );
    } else {
      return <p>No rotation information available.</p>;
    }
  };

  return (
    <div className="page">
      <h1 className="heading">Soil Detector</h1>
      <section className="dashboard">
        <div className="map">
          <MapContainer
            center={markerPosition}
            zoom={20}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={markerPosition}
              draggable={true}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
              eventHandlers={{
                dragend: handleMarkerMove,
              }}
            ></Marker>
          </MapContainer>
        </div>
        <div className="results">
          <div>
            <p>Latitude: {currentLatitude}</p>
            <p>Longitude: {currentLongitude}</p>
          </div>
          <button className="buttons" onClick={callApiWithLatLong}>
            Submit
          </button>
          {renderCropInformation()}
          {renderRotationTable()}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
