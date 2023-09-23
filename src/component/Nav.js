import React from "react";
import { Link } from "react-router-dom";
import "../Nav.css";

function Nav() {
  return (
    <nav>
      <div className="navbar">
        <div className="menu-left">
          <ul className="menu">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/news">News</Link>
            </li>
          </ul>
        </div>
        <div className="logo">
          <Link to="/home">Planter Pro</Link>
        </div>
        <div className="menu-right">
          <ul className="menu">
            <li>
              <Link to="/detect">Disease Detector</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
