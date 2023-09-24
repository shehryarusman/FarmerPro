import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Nav.css";

function Nav() {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        // If scrolled beyond 100vh, set scrolling state to true
        setScrolling(true);
      } else {
        // If not, set scrolling state to false
        setScrolling(false);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup by removing the scroll event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={scrolling ? "scrolled" : ""}>
      <div className="navbar">
        <div className="menu-left">
          <ul className="menu">
            <li>
              <Link className="nav-item" to="FarmerPro/dashboard">
                Dashboard
              </Link>
            </li>
            <li>
              <Link className="nav-item" to="FarmerPro/news">
                News
              </Link>
            </li>
          </ul>
        </div>
        <div className="logo">
          <Link to="FarmerPro/home">Planter Pro</Link>
        </div>
        <div className="menu-right">
          <ul className="menu">
            <li>
              <Link className="nav-item" to="FarmerPro/detect">
                Disease Detector
              </Link>
            </li>
            <li>
              <Link className="nav-item" to="FarmerPro/about">
                Our Team
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
