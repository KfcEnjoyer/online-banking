import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import "./styles/Home.css";

function Home() {
    //const [listOfPosts, setListOfPosts] = useState([]);
    //let navigate = useNavigate();

    //useEffect(() => {
    //  axios.get("http://localhost:3001/posts").then((response) => {
    //    setListOfPosts(response.data);
    //  });
   // }, []);
    
   return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">AL.bank</div>
        <div className="navLinks">
          <a href="/features">Features</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
          <a href="/about">About</a>
          <a href="/contacts">Contacts</a>
        </div>
      </div>
  
      {/* Welcome Section */}
      <div className="welcomeContainer">
        <div className="welcomeContent">
          <h1>New Vision of Banking</h1>
          <p>
            AL.bank brings you the most innovative tools to manage your finances
            effortlessly. Secure your future with us today.
          </p>
          <div className="ctaButtons">
            <a href="/login" className="ctaButton">Login</a>
            <a href="/openaccount" className="ctaButton">Open Account</a>
          </div>
        </div>
      </div>
  
      {/* Features Section */}
      <div className="featuresContainer">
    <div className="featureButton">
        <div className="iconPlaceholder">📊</div>
        <h3>Trusted by Professionals</h3>
        <p>Our solutions are used by financial experts around the world.</p>
    </div>
    <div className="featureButton">
        <div className="iconPlaceholder">🔍</div>
        <h3>Transparent and Reliable</h3>
        <p>We prioritize transparency and customer trust in all our services.</p>
    </div>
        <div className="featureButton">
          <div className="iconPlaceholder">🔒</div>
          <h3>Secure Transactions</h3>
          <p>We take care of every detail.</p>
        </div>
        <div className="featureButton">
          <div className="iconPlaceholder">🆓</div>
          <h3>Try Now!</h3>
          <p>First month use is for free.</p>
        </div>
      </div>

{/* Footer */}
<footer className="footer">
        <div className="waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>
        <ul className="social-icon">
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>
          <li className="social-icon__item">
            <a className="social-icon__link" href="#">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
          </li>
        </ul>
        <ul className="menu">
          <li className="menu__item">
            <a className="menu__link" href="#">Home</a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">About</a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">Services</a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">Team</a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">Contact</a>
          </li>
        </ul>
        <p>&copy;2024 AL.bank Corporation | All Rights Reserved</p>
        <script
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
        ></script>
        <script
          nomodule
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
        ></script>
      </footer>
    </div>
  );
}

export default Home
