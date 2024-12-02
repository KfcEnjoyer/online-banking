import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../helpers/axiosInstance";
import { jwtDecode } from "jwt-decode"; // Import the jwt-decode function

function GetAccounts() {
    const [accounts, setAccounts] = useState([]);
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
                <h1>Welcome to rrr ... bank!</h1>
            </div>
            <div className="openAccount">
                <h1>Your Accounts</h1>
                <div className="openAccount-card">
                    {accounts.length === 0 ? (
                        <p>No accounts found.</p>
                    ) : (
                        accounts.map((account, index) => (
                            <div key={index}>
                                <label>Account Number: <a href={"/account/" + account.accountNumber}>{account.accountNumber}</a></label>
                                <input value={account.accountNumber} readOnly />
                                <label>Balance: {account.balance}</label>
                                <input value={account.balance} readOnly />
                                <label>Account Type: {account.accountType}</label>
                                <input value={account.accountType} readOnly />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default GetAccounts;
