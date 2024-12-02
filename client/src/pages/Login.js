import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const login = () => {
        const data = { email, password };
        axios.post("http://172.24.2.169:3001/auth/login", data)
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    const token = response.data.token;
                    localStorage.setItem("token", token); // Store JWT in localStorage
                    navigate("/transfer"); // Redirect to the desired page
                }
            })

            .catch((error) => {
                console.error("Login error:", error);
                alert("Login failed");
            });
    };

    return (
        <div className="loginContainer">
    <div className="leftPane">
        <h1>Login</h1>
        <label>Email:</label>
        <input
            type="email"
            placeholder="Enter your email"
            onChange={(event) => setEmail(event.target.value)}
        />
        <label>Password:</label>
        <input
            type="password"
            placeholder="Enter your password"
            onChange={(event) => setPassword(event.target.value)}
        />
        <a href="/forgot-password" className="forgotPassword">Forgot Your Password?</a>
        <button className="loginButton" onClick={login}>Login</button>
    </div>
    <div className="rightPane">
        <div className="signupSection">
            <p>Don't have an account?</p>
            <a href="/openaccount" className="signupButton">Sign Up</a>
        </div>
        <h1>Welcome to AL.bank</h1>
        <p>Login to your account to check balances, transfer funds, pay bills, and more. Your security is our top priority.</p>
    </div>
</div>
    );
}

export default Login;