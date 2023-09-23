import React, { useEffect } from "react";

import "../Home.css";
import playVideo from "../globe-video.mp4";
import greenlandscape from "../green-landscape.jpeg";
import Image4 from "../recycle-important.jpeg";
import videoBackground from "../vid2.mp4";

function Home() {
  return (
    <div className="home">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={videoBackground} type="video/mp4" />
      </video>
      <section className="landing">
        <div className="globe"></div>
        <h1 className="name">Planter Pro</h1>
        <p className="copy">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel
          commodo elit. Integer lacinia tortor a lorem ornare rhoncus. Sed
          malesuada, ligula vel aliquet aliquet, nibh nisl porttitor est, et
          mattis dolor lorem sit amet dui.
        </p>
      </section>
    </div>
  );
}

export default Home;
