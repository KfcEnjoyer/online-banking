import React, { useState, useContext } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const login = () => {
    const data = { email: email, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
        if (response.data.error) {
            alert(response.data.error)
        }
        else{
            navigate("/");
        }
        
    });
  };
  return (
      <>
    <div className="loginContainer">
      <label>Email:</label>
      <input
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
        <p>Don't have an account? Register <a href="/register">here</a></p>
    </div>
      <div className="restBody">

      </div>
    </>
  );
}

export default Login;
