import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../helpers/axiosInstance";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./styles/openAccount.css";

function OpenAccount() {
    console.log(localStorage.getItem("token")); // Check if the token is stored

    const [accountType, setAccountType] = useState("");
    const nav = useNavigate();

    const initialValues = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        accountType: accountType
    };
    const validationSchema = Yup.object().shape({
        password: Yup.string().min(4).max(20).required()
    });
    const onSubmit = (data) => {
        console.log("Submitting form data:", data); // Check the data before sending it
        axios.post("http://172.24.2.169:3001/openaccount/open", data)
            .then((response) => {
                console.log("Response:", response.data);
                nav("/geta  ccounts")
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
    
          <main className="mainContent">
            <h1 className="mainTitle">Open Account</h1>
            <p className="mainSubtitle">Please select the type of the account:</p>
    
            <div className="accountOptions">
              <div className="accountCard">
                <img
                  src="images/credit_card_png90-1-9.png"
                  alt="Checking"
                  className="cardImage"
                />
                <p className="cardText">Checking</p>
              </div>
              <div className="accountCard">
                <img
                  src="images/credit_card_png90-2-10.png"
                  alt="Savings"
                  className="cardImage"
                />
                <p className="cardText">Savings</p>
              </div>
              <div className="accountCard">
                <img
                  src="images/credit_card_png90-3-11.png"
                  alt="Investment"
                  className="cardImage"
                />
                <p className="cardText">Investment</p>
              </div>
            </div>
          </main>
        </div>
      );
    };
    


export default OpenAccount;
