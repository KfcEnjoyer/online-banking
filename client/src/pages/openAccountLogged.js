import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import { FaArrowRight, FaArrowLeft, FaTimes, FaCheckCircle } from "react-icons/fa";
import "./styles/OpenAccountLogged.css"
import axios from "axios";

function OpenAccountLogged() {
    console.log(localStorage.getItem("token")); // Check if the token is stored
    const token = localStorage.getItem("token");
    const [accountType, setAccountType] = useState("");
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [formStep, setFormStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const handleCardClick = (type) => {
        setSelectedAccount(type);
        setAccountType(type);
        setIsConfirmModalVisible(true);
    };
    
    const handleCloseConfirmModal = () => {
        setIsConfirmModalVisible(false);
        setTimeout(() => {
            setSelectedAccount(null);
            setAccountType("");
        }, 300);
    };
    
    const handleCloseForm = () => {
        setIsFormVisible(false);
        setFormStep(1);
        setTimeout(() => {
            setSelectedAccount(null);
        }, 300);
    };
    
    const handleNext = () => {
        setFormStep(2);
    };
    
    const handleBack = () => {
        setFormStep(1);
    };
    
    const accountTypes = [
        {
            type: "Checking",
            description: "Everyday banking for daily transactions",
            icon: "💳"
        },
        {
            type: "Savings",
            description: "Grow your wealth with competitive interest rates",
            icon: "💰"
        },
        {
            type: "Investment",
            description: "Build your portfolio with our investment options",
            icon: "📈"
        }
    ];

    const handleCreateAccount = () => {
        setLoading(true);
        console.log("Creating account of type:", accountType);
        
        axios.post("http://127.0.0.1:3001/openaccount/open", 
            { accountType }, 
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
            console.log("Response:", response.data);
            setLoading(false);
            setIsConfirmModalVisible(false);
            setTimeout(() => {
                nav("/getaccounts");
            }, 500);
        })
        .catch((error) => {
            console.error("Error:", error.response ? error.response.data : error.message);
            setLoading(false);
            alert("Error creating account. Please try again.");
        });
    };

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <div className="open-account-container">
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
                        <a href="/login" className="login-button">Login</a>
                    </nav>
                    <div className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`} onClick={toggleMobileMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </header>
       
            <main className={`main-content ${isConfirmModalVisible ? "blurred-bg" : ""}`}>
                <section className="hero-section">
                    <h1>Open an Account</h1>
                    <p>Join thousands of satisfied customers who trust AL.bank for their financial needs</p>
                </section>
       
                <section className="account-selection">
                    <h2>Select an Account Type</h2>
                    <div className="account-cards">
                        {accountTypes.map((account) => (
                            <div 
                                key={account.type} 
                                className="account-card"
                                onClick={() => handleCardClick(account.type)}
                            >
                                <div className="account-icon">{account.icon}</div>
                                <h3>{account.type}</h3>
                                <p>{account.description}</p>
                                <button className="select-btn">Select</button>
                            </div>
                        ))}
                    </div>
                </section>
       
                <section className="benefits-section">
                    <h2>Why Choose AL.bank?</h2>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <div className="benefit-icon">🔒</div>
                            <h3>Secure Banking</h3>
                            <p>State-of-the-art security systems to protect your assets</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">📱</div>
                            <h3>Mobile Banking</h3>
                            <p>Access your accounts anytime, anywhere</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">💸</div>
                            <h3>No Hidden Fees</h3>
                            <p>Transparent fee structure with no surprises</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">🏆</div>
                            <h3>Award-winning Service</h3>
                            <p>Dedicated customer support available 24/7</p>
                        </div>
                    </div>
                </section>
            </main>
      
            {/* Confirmation Modal */}
            {isConfirmModalVisible && (
                <div className="confirmation-modal-container">
                    <div className="confirmation-modal">
                        <button className="close-button" onClick={handleCloseConfirmModal}>
                            <FaTimes />
                        </button>
                        
                        <div className="confirm-header">
                            <div className="confirm-icon">{accountTypes.find(a => a.type === selectedAccount)?.icon}</div>
                            <h2>Confirm {selectedAccount} Account</h2>
                        </div>
                        
                        <div className="confirm-content">
                            <p>You are about to open a new <strong>{selectedAccount}</strong> account.</p>
                            <p>This account will be added to your profile immediately upon creation.</p>
                        </div>
                        
                        <div className="confirm-actions">
                            <button 
                                type="button" 
                                className="secondary-button" 
                                onClick={handleCloseConfirmModal}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                className="primary-button" 
                                onClick={handleCreateAccount}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading-spinner-small"></span>
                                ) : (
                                    <>
                                        <FaCheckCircle /> Create Account
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <footer className="footer">
                <div className="footer-waves">
                    <div className="wave" id="wave1"></div>
                    <div className="wave" id="wave2"></div>
                </div>
       
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>AL.bank</h3>
                        <p>Your trusted financial partner since 2010.</p>
                        <div className="social-icons">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
       
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/login">Login</a></li>
                        </ul>
                    </div>
       
                    <div className="footer-section">
                        <h3>Our Services</h3>
                        <ul className="footer-links">
                            <li><a href="/checking">Checking Accounts</a></li>
                            <li><a href="/savings">Savings Accounts</a></li>
                            <li><a href="/investment">Investment Options</a></li>
                            <li><a href="/loans">Personal Loans</a></li>
                            <li><a href="/mortgage">Mortgage</a></li>
                        </ul>
                    </div>
       
                    <div className="footer-section">
                        <h3>Contact Us</h3>
                        <div className="contact-info">
                            <p><i className="fas fa-map-marker-alt"></i> 123 Banking Street, Finance City</p>
                            <p><i className="fas fa-phone-alt"></i> (555) 123-4567</p>
                            <p><i className="fas fa-envelope"></i> support@albank.com</p>
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p>&copy; 2025 AL.bank. All Rights Reserved.</p>
                        <div className="footer-bottom-links">
                            <a href="/terms">Terms & Conditions</a>
                            <a href="/privacy">Privacy Policy</a>
                            <a href="/security">Security Information</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default OpenAccountLogged;