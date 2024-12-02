import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../helpers/axiosInstance";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";

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
        axios.post("http://localhost:3001/openaccount/open", data)
            .then((response) => {
                console.log("Response:", response.data);
                nav("/geta  ccounts")
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

                <button onClick={console.log(accountType)}></button>

                <div className="openAccount-card">
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {({setFieldValue} ) => <Form className="formContainer">
                            <label>Account Type: </label>
                            <Field id="accountType" name="accountType" placeholder="Account Type..." readOnly value={accountType}/>
                            <div className="checking-box">
                                <button onClick={() => {
                                    setAccountType("Checking");
                                    setFieldValue("accountType", "Checking")
                                }}>Checking
                                </button>
                            </div>
                            <div className="savings-box">
                                <button onClick={() => {
                                    setAccountType("Savings");
                                    setFieldValue("accountType", "Savings")
                                }}>Checking
                                </button>
                            </div>
                            <div className="investments-box">
                                <button onClick={() => {
                                    setAccountType("Investments");
                                    setFieldValue("accountType", "Investments")
                                }}>Checking
                                </button>
                            </div>

                            <label>Email: </label>
                            <ErrorMessage name="email" component="span"/>
                            <Field id="inputCreatePost" name="email" placeholder="(Ex, John123...)"/>
                            <label>Password: </label>
                            <ErrorMessage name="password" component="span"/>
                            <Field id="inputCreatePost" type="password" name="password"
                                   placeholder="Your Password..."/>
                            <label>First Name: </label>
                            <ErrorMessage name="firstName" component="span"/>
                            <Field id="inputCreatePost" name
                                ="firstName" placeholder="(Ex, John...)"/>
                            <label>Last Name: </label>
                            <ErrorMessage name="lastName" component="span"/>
                            <Field id="inputCreatePost" name="lastName" placeholder="(Ex, Doe...)"/>
                            <label>Phone Number: </label>
                            <ErrorMessage
                                name="phoneNumber" component="span"/>
                            <Field id="inputCreatePost" name="phoneNumber" placeholder="(Ex, 1234567890...)"/>
                            <button type="submit">Open Account</button>
                        </Form>
                        }
                    </Formik>
                </div>

            </div>
        </div>
    );
}


export default OpenAccount;
