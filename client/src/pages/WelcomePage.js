import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";

function Home() {
    let nav = useNavigate();

    return (
        <div className="main-container">
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
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </ul>
                </nav>
                <h1>Welcome to the ... bank!</h1>
            </div>
            <div className="mid-container">
                <div className="accounts">
                    <h2>Open a bank account with 0 fees!</h2>'
                    <button onClick={nav("/openAccount")}>Open account</button>
                </div>
                <div className="crypto">
                    <h2>New crypto-enabled account!</h2>
                    <p>Open a crypto bank account within our bank!</p>
                    <button onClick={nav("/cryptoAcc")}>Apply</button>
                </div>
            </div>
            <div className="bot-container">

            </div>
        </div>
    )
}

export default Home
