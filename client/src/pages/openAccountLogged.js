import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../helpers/axiosInstance";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";

function OpenAccountLogged() {
    console.log(localStorage.getItem("token")); // Check if the token is stored
    const token = localStorage.getItem("token");
    const [accountType, setAccountType] = useState("");
    const nav = useNavigate();

    const onSubmit = (data) => {
        console.log("Submitting form data:", data); // Check the data before sending it
        axios.post("http://172.24.2.169:3001/openaccount/open", {accountType}, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                console.log("Response:", response.data);
                nav("/getaccounts")
            })
            .catch((error) => {
                console.error("Error:", error.response ? error.response.data : error.message);
            });
    }

    return (
        <div>
            <div className="top-container">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Logout</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </ul>
                </nav>
                <h1>Welcome to the ... bank!</h1>
            </div>
            <div className="openAccount">
                <h1>Open Account</h1>
                <p>Please select the type of the account:</p>

                <div className="openAccount-card">
                    <label>Account Type: </label>
                    <div className="checking-box">
                        <button onClick={() => {
                            setAccountType("Checking");
                        }}>Checking
                        </button>
                    </div>
                    <div className="savings-box">
                        <button onClick={() => {
                            setAccountType("Savings");
                        }}>Checking
                        </button>
                    </div>
                    <div className="investments-box">
                        <button onClick={() => {
                            setAccountType("Investments");
                        }}>Checking
                        </button>
                    </div>
                    <button type="submit" onClick={onSubmit}>Submit</button>
                </div>

            </div>
        </div>
    );
}


export default OpenAccountLogged;