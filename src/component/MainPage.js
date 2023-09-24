import React, { useEffect } from "react";

import "../Home.css";
import playVideo from "../vid2.mp4";
import greenlandscape from "../heart.jpeg";
import Image4 from "../enviromental_image_contact2.jpeg";

function Home() {
  useEffect(() => {
    function handleScroll() {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight * 0.75) {
          element.classList.add("animate");
        } else {
          element.classList.remove("animate");
        }
      });
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <video muted autoPlay loop playsInline className="hero-video">
          <source src={playVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content"></div>
      </section>

      <section className="about animate-on-scroll">
        <div className="about-inner">
          <div className="about-image">
            <img src={greenlandscape} alt="A person holding a recycling bin" />
          </div>
          <div className="about-text">
            <h1>Crop Disease Prevention: Why is it Vital?</h1>
            <p>
              Agriculture is the backbone of our global food supply, and the
              importance of crop disease prevention cannot be overstated. Crop
              diseases caused by fungi, bacteria, and viruses pose a significant
              threat to food security, potentially reducing yield and quality,
              leading to substantial economic losses and increased food prices.
              It is estimated that plant diseases cost the global economy over
              $220 billion annually, losing 10-16% of the global harvest each
              year. Effective disease management strategies, such as the
              development of disease-resistant crop varieties, implementation of
              biosecurity measures, and the judicious use of fungicides, are
              crucial. These strategies protect farmers' livelihoods and play a
              pivotal role in ensuring a stable and sustainable food supply for
              the growing global population, which is projected to reach 9.7
              billion by 2050. By prioritizing crop disease prevention, we can
              mitigate the risk of food shortages, stabilize food prices, and
              contribute to global food security and poverty reduction.
            </p>
          </div>
        </div>
      </section>

      <section className="process animate-on-scroll">
        <div className="process-inner">
          <div className="process-text">
            <h1>Finding the Right Spot for the Right Crop.</h1>
            <p>
              Crop selection and soil suitability have emerged as pivotal
              considerations in modern agriculture. With the Food and
              Agriculture Organization (FAO) predicting a 50% surge in global
              food demand by 2050, there's mounting pressure to adopt
              sustainable farming practices. In the United States, where over
              50% of crop losses are attributed to poor crop-soil compatibility,
              the urgency of making well-informed crop choices is evident.
              Selecting the right crop for a specific geographical location and
              soil type enhances agricultural productivity, promoting higher
              yields and reducing the need for chemical inputs, as studies by
              the Soil Science Society of America have demonstrated, showing
              potential reductions of up to 50% in synthetic fertilizer use.
              This approach not only benefits the environment but also bolsters
              food security, ensuring that crops are cultivated where they
              thrive, thus meeting the needs of an ever-expanding global
              population. In sum, it is a crucial element of sustainable
              agriculture with profound implications for our planet's long-term
              health and well-being.
            </p>
          </div>
          <div className="process-image">
            <img src={Image4} alt="Recycled cans" />
          </div>
        </div>
      </section>

      <section className="process animate-on-scroll">
        <div className="process-inner">
          <div className="process-image">
            <img src={greenlandscape} alt="A person holding a recycling bin" />
          </div>
          <div className="about-text">
            <h1>Empowering Farmers for a Sustainable Future</h1>
            <p>
              At FarmerPro, we are on a mission to revolutionize agriculture and
              empower farmers across the globe. We believe in harnessing the
              power of data, artificial intelligence, and community
              collaboration to create a more sustainable and environmentally
              friendly future for farming. Our technology enables farmers to
              scan their soil, analyze local weather conditions, and assess
              plant health with precision, resulting in smarter crop choices.
              Join us in our mission to cultivate a brighter future for
              agriculture, one data-driven decision at a time.
            </p>
          </div>
        </div>
      </section>

      <section className="features animate-on-scroll">
        <h1 className="feature-title">Our Products:</h1>
        <div className="features-inner">
          <div className="feature-card">
            <i className="fas fa-recycle"></i>
            <h2>Croptimizer</h2>
            <p>
              Explore optimal cultivation areas with our interactive map
              feature, designed to assist farmers in identifying the most
              suitable crops for their selected locations. By leveraging
              advanced location analytics and comprehensive agricultural data,
              this feature provides tailored recommendations, helping farmers
              maximize yield and resource efficiency.
            </p>
          </div>
          <div className="feature-card">
            <i className="fas fa-handshake"></i>
            <h2>Disease Detector</h2>
            <p>
              Detect and manage plant diseases effectively with our innovative
              disease detector. This feature allows farmers to upload images of
              their crops and receive instant, accurate diagnoses of potential
              diseases, along with expert advice on treatment and prevention,
              ensuring healthy and thriving crops.
            </p>
          </div>
          <div className="feature-card">
            <i className="fas fa-recycle"></i>
            <h2>News</h2>
            <p>
              Stay informed with the latest agricultural trends, insights, and
              news. Our curated news section provides farmers with real-time
              updates and articles from reputable sources, offering knowledge
              and information essential for making informed and strategic
              farming decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="contact animate-on-scroll">
        <div className="grid-container">
          <div className="contact-heading">
            <h1>Contact Us</h1>
          </div>
          <div className="contact-inner">
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" required></textarea>
              </div>
              <div className="form-group">
                <button type="submit" className="btn-submit">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
