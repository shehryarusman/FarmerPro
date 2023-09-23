import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import "../Dashboard.css"
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

function Dashboard() {
  // State to manage marker position
  const [markerPosition, setMarkerPosition] = useState([39.9566, -75.1899]);

  // Function to handle marker move
  const handleMarkerMove = (e) => {
    const { lat, lng } = e.target.getLatLng();
    setMarkerPosition([lat, lng]);
    console.log("Latitude:", lat);
    console.log("Longitude:", lng);
  };
  // Function to call the API with latitude and longitude data
  const callApiWithLatLong = () => {
    const latitude = markerPosition[0];
    const longitude = markerPosition[1];

    const apiName = "predict";
    const apiUrl = `http://127.0.0.1:5000/${apiName}?latitude=${latitude}&longitude=${longitude}`;
    console.log("API URL:", apiUrl);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        console.log("success!")
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h1 className="heading">Soil Detector</h1>
      <section className="dashboard">
        <div className="map">
          <MapContainer
            center={markerPosition}
            zoom={20}
            style={{ height: "400px", width: "100%" }}
          >
            {/* Add a tile layer for the base map */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Display the draggable marker with the default Leaflet icon */}
            <Marker
              position={markerPosition}
              draggable={true}
              icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}
              eventHandlers={{
                dragend: handleMarkerMove,
              }}
            >
                </Marker>
          </MapContainer>
        </div>
        <div className="results">
          <p>Plant</p>
          <p>pH</p>
          <p>Blah</p>
          <p>Blah</p>
          <div>
            <p>Latitude: {markerPosition[0]}</p>
            <p>Longitude: {markerPosition[1]}</p>
          </div>
          <button onClick={callApiWithLatLong}>Submit</button>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
