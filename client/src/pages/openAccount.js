import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../helpers/axiosInstance";
import { AuthContext } from "../helpers/AuthContext";

function OpenAccount() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [type, setType] = useState("");
    const [phone, setPhone] = useState("");
    const nav = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            // if (!token) {
            //     alert("You are not logged in!");
            //     nav("/login");
            // }
            // try {
            //     const response = await axiosInstance.get("/openaccount/get", {
            //         headers: { Authorization: `Bearer ${token}` },
            //     });
            //     setFirstName(response.data.firstName);
            //     setLastName(response.data.lastName);
            //     setPhone(response.data.phoneNumber);
            // } catch (error) {
            //     console.error("Error fetching user data:", error);
            //     alert(error.response?.data?.error || "Failed to fetch user details.");
            // }
        };
        fetchUserData();
    }, [nav]);

    // Handle account creation submission
    const handleSubmit = async () => {
        if (!type) {
            alert("Please select an account type.");
            return;
        }
        const token = localStorage.getItem("token");
        // if (!token) {
        //     alert("Authorization required. Please log in.");
        //     nav("/login");
        //     return;
        // }

        try {
            const response = await axiosInstance.post(
                "/openaccount/open",
                { accountType: type },  // Only send accountType
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Account created successfully! Account Number: " + response.data.accountNumber);
        } catch (error) {
            console.error("Error creating account:", error);
            alert(error.response?.data?.error || "Failed to create account.");
        }
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
            <div className="openAccount">
                <h1>Open Account</h1>
                <p>Please select the type of the account:</p>
                <button onClick={() => setType("Checking") }>Checking</button>
                <button onClick={console.log(type)}>Savings</button>
                <div className="openAccount-card">
                    {/*<label>First Name</label>*/}
                    {/*<input value={firstName} />*/}
                    {/*<label>Last Name</label>*/}
                    {/*<input value={lastName} />*/}
                    {/*<label>Phone Number</label>*/}
                    {/*<input value={phone} />*/}
                    <label>Account Type</label>
                    <select value={type} onChange={(event) => setType(event.target.value)}>
                        <option value="">Please select an option</option>
                        <option value="Checking">Checking</option>
                        <option value="Savings">Savings</option>
                    </select>
                </div>
                <button onClick={handleSubmit}>Open Account</button>
            </div>
        </div>
    );
}

export default OpenAccount;
