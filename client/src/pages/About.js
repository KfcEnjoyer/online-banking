import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import './styles/About.css';

function About() {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <div className="about-container">
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <h1>AL.bank</h1>
                    </div>
                    <nav className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
                        <a href="/">Home</a>
                        <a href="/about" className="active">About</a>
                        <a href="/services">Services</a>
                        <a href="/contact">Contact</a>
                        <a href="/login" className="login-button">Login</a>
                        <a href="/register" className="register-button">Register</a>
                    </nav>
                    <div className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`} onClick={toggleMobileMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </header>

            <main className="about-content">
                <h1>About AL.bank</h1>
                <p>
                    Founded in 2010, AL.bank was created with a simple mission: to make banking accessible, 
                    transparent, and fee-free for everyone. We started as a small team of financial experts 
                    and tech innovators who believed that traditional banking needed a major overhaul.
                </p>
                <p>
                    Today, AL.bank is a trusted financial institution serving thousands of customers nationwide. 
                    We offer a range of services including checking accounts, savings accounts, investments, 
                    and our newest crypto-enabled accounts.
                </p>
                <p>
                    We remain committed to our founding principles of transparency, zero fees, and 
                    excellent customer service.
                </p>
            </main>

            <footer className="footer">
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
                        <h3>Contact Us</h3>
                        <div className="contact-info">
                            <p><i className="fas fa-map-marker-alt"></i> 123 Banking Street, Finance City</p>
                            <p><i className="fas fa-phone-alt"></i> (555) 123-4567</p>
                            <p><i className="fas fa-envelope"></i> support@albank.com</p>
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>&copy; 2025 AL.bank. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default About;