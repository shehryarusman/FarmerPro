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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu
              fermentum nunc, nec faucibus elit. Vestibulum quis massa ac ante
              finibus pretium ut a nisl. Cras quis rutrum lacus. Pellentesque
              nec finibus nulla, nec luctus leo. Vestibulum aliquet tincidunt
              purus eget consequat. Nullam faucibus malesuada purus, in mollis
              erat rutrum quis. In aliquam, velit id condimentum varius, risus
              magna mattis nisl, vel pharetra mauris lectus et leo.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu
              fermentum nunc, nec faucibus elit. Vestibulum quis massa ac ante
              finibus pretium ut a nisl. Cras quis rutrum lacus. Pellentesque
              nec finibus nulla, nec luctus leo. Vestibulum aliquet tincidunt
              purus eget consequat. Nullam faucibus malesuada purus, in mollis
              erat rutrum quis. In aliquam, velit id condimentum varius, risus
              magna mattis nisl, vel pharetra mauris lectus et leo.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu
              fermentum nunc, nec faucibus elit. Vestibulum quis massa ac ante
              finibus pretium ut a nisl. Cras quis rutrum lacus. Pellentesque
              nec finibus nulla, nec luctus leo. Vestibulum aliquet tincidunt
              purus eget consequat. Nullam faucibus malesuada purus, in mollis
              erat rutrum quis. In aliquam, velit id condimentum varius, risus
              magna mattis nisl, vel pharetra mauris lectus et leo.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu
              fermentum nunc, nec faucibus elit. Vestibulum quis massa ac ante
              finibus pretium ut a nisl. Cras quis rutrum lacus. Pellentesque
              nec finibus nulla, nec luctus leo. Vestibulum aliquet tincidunt
              purus eget consequat. Nullam faucibus malesuada purus, in mollis
              erat rutrum quis. In aliquam, velit id condimentum varius, risus
              magna mattis nisl, vel pharetra mauris lectus et leo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
