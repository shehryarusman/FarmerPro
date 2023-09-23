import "../Dashboard.css";
import Webcam from "react-webcam";

function Dashboard() {
    return (
        <div>
            <h1 className="heading">Soil Detector</h1>
            <section className="dashboard">
                <div className="map">
                </div>
                <div className="results">
                    <p>Plant</p>
                    <p>pH</p>
                    <p>Blah</p>
                    <p>Blah</p>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;