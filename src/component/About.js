import React from "react";
import "../About.css";
import Mustafa from "../mustafa.jpg";
import Alex from "../alex.jpg";
import Sherry from "../sherry.jpeg";
import Vatsal from "../vatsal.JPG";

function About() {
  return (
    <div className="our-team">
      <h1 className="heading-about">Our Team</h1>
      <div className="team">
        <div className="profile">
          <div className="profile-info">
            <h1>Alex Zavalny</h1>
            <p>Backend Engineer</p>
          </div>
          <img src={Alex} alt="Profile Picture" />
          <div className="description">
            <p>
              Alex took charge of the backend development for our hackathon
              project. They designed and implemented the Flask-based API that
              serves as the backbone of our application. BED1 ensured smooth
              data management, authentication, and secured API endpoints. They
              also handled database interactions and worked on overall
              infrastructure setup.
            </p>
          </div>
        </div>
        <div className="profile">
          <div className="profile-info">
            <h1>Mustafa Eren</h1>
            <p>Frontend Engineer</p>
          </div>
          <img src={Mustafa} alt="Profile Picture" />
          <div className="description">
            <p>
              Mustafa focused on the frontend architecture of our hackathon
              project. They meticulously organized and optimized the frontend
              codebase, making it easy to maintain and enhancing its
              performance. FED2 also collaborated closely with the design team
              to translate creative concepts into interactive user interfaces.
            </p>
          </div>
        </div>
        <div className="profile">
          <div className="profile-info">
            <h1>Shehryar Usman</h1>
            <p>Backend Engineer</p>
          </div>
          <img className="sherry" src={Sherry} alt="Profile Picture" />
          <div className="description">
            <p>
              Shehryar's expertise was vital in scaling the backend and
              integrating machine learning components. They focused on
              optimizing server-side performance, designing robust database
              schemas, and facilitating the incorporation of machine learning
              models into our application. BED2 also implemented security
              measures to protect user data and our API.
            </p>
          </div>
        </div>
        <div className="profile">
          <div className="profile-info">
            <h1>Vatsal Jain</h1>
            <p>Frontend Engineer</p>
          </div>
          <img src={Vatsal} alt="Profile Picture" />
          <div className="description">
            <p>
              Vatsal was instrumental in crafting the user interface (UI) of our
              hackathon project. They skillfully designed and implemented the
              frontend components using React, ensuring an intuitive and
              visually appealing user experience. FED1 also played a key role in
              integrating machine learning features seamlessly into the
              frontend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
