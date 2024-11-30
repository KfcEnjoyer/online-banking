import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const login = () => {
        const data = { email, password };
        axios.post("http://localhost:3001/auth/login", data)
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    const token = response.data.token;
                    localStorage.setItem("token", token); // Store JWT in localStorage
                    console.log(token);
                    navigate("/openaccount"); // Redirect to the desired page
                }
            })
            .catch((error) => {
                console.error("Login error:", error);
                alert("Login failed");
            });
    };

    return (
        <div className="loginContainer">
            <label>Email:</label>
            <input
                type="text"
                onChange={(event) => setEmail(event.target.value)}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(event) => setPassword(event.target.value)}
            />
            <button onClick={login}>Login</button>
            <p>Don't have an account? Register <a href="/register">here</a></p>
        </div>
    );
}

export default Login;
