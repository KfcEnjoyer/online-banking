import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaBars, FaArrowRight } from "react-icons/fa";
import "./styles/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    let navigate = useNavigate();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const login = () => {
        if (!email || !password) {
            setError("Please enter both email and password");
            return;
        }

        setLoading(true);
        setError("");
        const data = { email, password };
        
        axios.post("http://127.0.0.1:3001/auth/login", data)
            .then((response) => {
                if (response.data.error) {
                    setError(response.data.error);
                } else {
                    const token = response.data.token;
                    localStorage.setItem("token", token);
                    navigate("/getaccounts");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Login error:", error);
                setError(error.response?.data?.error || "Login failed. Please check your credentials.");
                setLoading(false);
            });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            login();
        }
    };

    return (
        <div className="login-page-container">
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <h1>AL.bank</h1>
                    </div>
                    <nav className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
                        <a href="/">Home</a>
                        <a href="/about">About</a>
                        <a href="/services">Services</a>
                        <a href="/contact">Contact</a>
                        <a href="/register" className="register-button">Register</a>
                    </nav>
                    <div className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`} onClick={toggleMobileMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </header>

            <main className="login-content">
                <div className="login-card">
                    <div className="login-left">
                        <div className="login-header">
                            <h2>Welcome Back</h2>
                            <p>Log in to access your accounts</p>
                        </div>
                        
                        {error && <div className="error-message">{error}</div>}
                        
                        <div className="login-form">
                            <div className="form-group">
                                <label htmlFor="email">
                                    <FaEnvelope /> Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="password">
                                    <FaLock /> Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            
                            <div className="forgot-password">
                                <Link to="/forgot-password">Forgot your password?</Link>
                            </div>
                            
                            <button 
                                className="login-button" 
                                onClick={login}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading-spinner"></span>
                                ) : (
                                    <>Log In <FaArrowRight /></>
                                )}
                            </button>
                        </div>
                        
                        <div className="login-footer">
                            <p>Don't have an account?</p>
                            <Link to="/openaccount" className="signup-link">Open an Account</Link>
                        </div>
                    </div>
                    
                    <div className="login-right">
                        <div className="login-showcase">
                            <h2>Banking Made Simple</h2>
                            <ul className="features-list">
                                <li>24/7 Account Access</li>
                                <li>Secure Online Banking</li>
                                <li>Zero-Fee Accounts</li>
                                <li>Easy Money Transfers</li>
                                <li>Mobile Banking App</li>
                            </ul>
                            <div className="security-badge">
                                <div className="badge-icon">
                                    <FaLock />
                                </div>
                                <p>Bank-level security with 256-bit encryption</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2025 AL.bank. All Rights Reserved.</p>
                    <div className="footer-links">
                        <a href="/terms">Terms & Conditions</a>
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/security">Security Information</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Login;