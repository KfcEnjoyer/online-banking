import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../helpers/axiosInstance";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";

function Transfer() {
    const [accounts, setAccounts] = useState([]);
    const [originalAccount, setOriginalAccount] = useState("");
    const [targetAccount, setTargetAccount] = useState("");
    const [amount, setAmount] = useState(0.00);
    const nav = useNavigate();

    useEffect(() => {
        const fetchAccountsData = async () => {
            const token = localStorage.getItem("token");
            console.log(localStorage.getItem("token")); // Check if the token is stored

            if (!token) {
                alert("You are not logged in!");
                nav("/login");
                return;
            }

            try {

                const response = await axiosInstance.get("/openaccount/get", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("API response:", response.data); // Log the API response

                if (Array.isArray(response.data)) {
                    setAccounts(response.data); // If it's an array, set the accounts
                } else {
                    console.error("Expected an array of accounts, but got:", response.data);
                    setAccounts([]); // Set to an empty array if not an array
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                alert(error.response?.data?.error || "Failed to fetch user details.");
            }
        };

        fetchAccountsData();
    }, [nav]);

    const handleSubmit = () => {
        const token = localStorage.getItem("token");
        console.log(localStorage.getItem("token")); // Check if the token is stored

        if (!token) {
            alert("You are not logged in!");
            nav("/login");
            return;
        }
        const data = { originalAccount, targetAccount, amount };
        axios.post("http://172.24.2.169:3001/transfer", data, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log("Response:", response.data);
                nav("/getaccounts"); // Navigate to accounts page after successful transfer
            })
            .catch((error) => {
                console.error("Error:", error.response ? error.response.data : error.message);
            });
    };

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
            <div className="container">
                <div className="transfer-money">
                    <label>Please select an account you want to transfer your funds to: </label>
                    <select onChange={(e) => setTargetAccount(e.target.value)}>
                        <option value="">-- Select Account --</option>
                        {accounts
                            .filter((account) => account.accountNumber !== originalAccount)
                            .map((account) => (
                                <option key={account.accountNumber} value={account.accountNumber}>
                                    {account.accountNumber}, {account.accountType}
                                </option>
                            ))}
                    </select>

                    <label>Please select an account you want to transfer your funds from: </label>
                    <select onChange={(e) => setOriginalAccount(e.target.value)}>
                        <option value="">-- Select Account --</option>
                        {accounts
                            .filter((account) => account.accountNumber !== targetAccount)
                            .map((account) => (
                                <option key={account.accountNumber} value={account.accountNumber}>
                                    {account.accountNumber}, {account.accountType}
                                </option>
                            ))}
                    </select>
                    <label>Please enter the amount:</label>
                    <button onClick={console.log(amount)} />
                    <input type="number" onChange={(e) => setAmount(e.target.value)}/>
                    <button onClick={handleSubmit}>Transfer</button>
                </div>
            </div>
        </div>
    );
}


export default Transfer;
