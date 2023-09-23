import "../Dashboard.css";
import Webcam from "react-webcam";

function Dashboard() {
  return (
    <div>
      <h1 className="heading">Soil Detector</h1>
      <section className="dashboard">
        <div className="map"></div>
        <div className="results">
          <p>Plant</p>
          <p>pH</p>
          <p>
            | Spring/ Summer | Fall/ Winter\n\nMuskmelon | Kidneybeans |
            Mothbeans\n\nWatermelon | Mothbeans | Muskmelon\n\nMothbeans |
            Muskmelon | Watermelon\n\nKidneybeans | Watermelon | Kidneybeans
          </p>
          <p></p>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
