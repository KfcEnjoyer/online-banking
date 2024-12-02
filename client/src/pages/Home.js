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
    </div>
  );
  
}

export default Home
