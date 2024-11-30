import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function showInput() {

}

function OpenAccount() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [type, setType] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You are not logged in!");
                return;
            }
            console.log(localStorage.getItem("token"));


            try {
                const response = await axios.get("http://localhost:3001/openaccount", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setPhone(response.data.phoneNumber);
            } catch (error) {
                console.error("Error fetching user data:", error);
                alert(error.response?.data?.error || "Failed to fetch user details.");
            }
        };

        fetchUserData();
    }, []);

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
                            <Link className="nav-link" to="/login">logout</Link>
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
                <button id="checking-button" onClick={setType("Checking")}>Checking</button>
                <button id="savings-button" onClick={setType("Savings")}>Savings</button>
                <div className="openAccount-card">
                    <p>First Name: {firstName}</p>
                    <p>Last Name: {lastName}</p>
                    <p>Phone: {phone}</p>
                </div>
            </div>
        </div>
    );
}

export default OpenAccount;
