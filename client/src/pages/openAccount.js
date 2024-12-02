import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../helpers/axiosInstance";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./styles/openAccount.css";

function OpenAccount() {
    console.log(localStorage.getItem("token")); // Check if the token is stored

    const [selectedAccount, setSelectedAccount] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSecondFormVisible, setIsSecondFormVisible] = useState(false);
  const nav = useNavigate(); 
  const [formStep, setFormStep] = useState(1); 

  const handleCardClick = (type) => {
    setSelectedAccount(type);
    setIsFormVisible(true);  // Показываем форму после выбора карточки
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setTimeout(() => {
      setSelectedAccount(null);  // Сбрасываем выбранный аккаунт
    }, 200);  // Задержка для анимации
  };

  const handleNext = () => {
    setFormStep(2); // Перейти ко второму шагу формы
    setIsSecondFormVisible(true); // Показать второй шаг
  };
  

      

    

    const initialValues = {
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        primaryAddress: "",
        secondaryAddress: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        accountType: selectedAccount
    };
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        phoneNumber: Yup.string().required("Phone number is required"),
        primaryAddress: Yup.string().required("Primary address is required"),
        password: Yup.string().min(4).max(20).required(),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        country: Yup.string().required("Country is required"),
        zipCode: Yup.string().required("Zip code is required")
    });
    const onSubmit = (data) => {
        console.log("Submitting form data:", data); // Check the data before sending it
        axios.post("http://172.24.2.169:3001/openaccount/create", data)
            .then((response) => {
                console.log("Account created:", response.data);
                const token = response.data.token;
                localStorage.setItem("token", token); // Save the token

                // Now open the account after successful user creation
                return axios.post(
                    "http://172.24.2.169:3001/openaccount/open",
                    { selectedAccount },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            })
            .then((response) => {
                console.log("Account opened:", response.data);
                nav("/getaccounts"); // Redirect to the account list page
            })
            .catch((error) => {
                console.error("Error:", error.response ? error.response.data : error.message);
            });
    }


    return (
        <div className="openAccountContainer">
          <header className="header">
            <p className="bankName">AL.bank</p>
            <nav className="navLinks">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <a href="#login">Login</a>
            </nav>
          </header>
      
          <main className={`mainContent ${isFormVisible ? "" : "fadeOutMain"}`}>
            <div className={isFormVisible ? "fadeOutTitle" : ""}>
              <h1 className="mainTitle">Open Account</h1>
              <p className="mainSubtitle">Please select the type of the account:</p>
            </div>
      
            <div className={`accountOptions ${selectedAccount ? "hidden" : ""} ${isFormVisible ? "fadeOutOptions" : ""}`}>
              {["Checking", "Savings", "Investment"].map((type) => (
                <div
                  key={type}
                  className={`accountCard ${selectedAccount === type ? "expand" : ""}`}
                  onClick={() => handleCardClick(type)}
                >
                  <img src="/credit_card_png90-3-11.png" alt={type} className="cardImage" />
                  <p className="cardText">{type}</p>
                </div>
              ))}
            </div>
          </main>
      
          {isFormVisible && (
            <div className="registrationForm">
              {formStep === 1 ? (
                <>
                  <h2>{selectedAccount} Account</h2>
                  <form>
                    <input type="text" placeholder="First name:" />
                    <input type="text" placeholder="Last name:" />
                    <input type="email" placeholder="Email:" />
                    <input type="password" placeholder="Password:" />
                    <input type="text" placeholder="Phone Number:" />
                    <div className="buttonContainer">
                      <button type="button" onClick={handleCloseForm}>Close</button>
                      <button type="button" onClick={handleNext}>Next</button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h2>{selectedAccount} Account - Address Information</h2>
                  <form>
                    <input type="text" placeholder="Primary address:" />
                    <input type="text" placeholder="City:" />
                    <input type="text" placeholder="State:" />
                    <input type="text" placeholder="Country:" />
                    <input type="text" placeholder="Zip Code:" />
                    <input type="password" placeholder="Confirm Password:" />
                    <div className="buttonContainer">
                      <button type="button" onClick={handleCloseForm}>Close</button>
                      <button type="submit">Submit</button>
                    </div>
                  </form>
                </>
              )}
            </div>
            

          )}


          {/* Footer Section */}
  <footer className="footer">
    <div className="wave" id="wave1"></div>
    <div className="wave" id="wave2"></div>
    <div className="wave" id="wave3"></div>
    <div className="wave" id="wave4"></div>
    <ul className="social-icon">
      <li className="social-icon__item">
        <a href="#" className="social-icon__link">
          <i className="fab fa-facebook-f"></i>
        </a>
      </li>
      <li className="social-icon__item">
        <a href="#" className="social-icon__link">
          <i className="fab fa-twitter"></i>
        </a>
      </li>
      <li className="social-icon__item">
        <a href="#" className="social-icon__link">
          <i className="fab fa-instagram"></i>
        </a>
      </li>
      <li className="social-icon__item">
        <a href="#" className="social-icon__link">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </li>
    </ul>
    <ul className="menu">
      <li className="menu__item">
        <a href="#home" className="menu__link">Home</a>
      </li>
      <li className="menu__item">
        <a href="#about" className="menu__link">About</a>
      </li>
      <li className="menu__item">
        <a href="#services" className="menu__link">Services</a>
      </li>
      <li className="menu__item">
        <a href="#contact" className="menu__link">Contact</a>
      </li>
    </ul>
    <p>&copy; 2024 AL.bank. All Rights Reserved.</p>
  </footer>

        </div>
        
      );
    }


export default OpenAccount;