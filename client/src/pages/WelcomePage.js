import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaBars, FaCheckCircle, FaShieldAlt, FaMobileAlt, FaCreditCard, FaBitcoin } from 'react-icons/fa';
import './styles/WelcomePage.css';

function Home() {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleOpenAccount = () => {
        navigate("/openAccount");
    };

    const handleCryptoAccount = () => {
        navigate("/cryptoAcc");
    };

    return (
        <div className="home-container">
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <h1>AL.bank</h1>
                    </div>
                    <nav className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
                        <a href="/" className='active'>Home</a>
                        <a href="/about">About</a>
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

            <main>
                <section className="hero-section">
                    <div className="hero-content">
                        <h1>Banking Made Simple for Everyone</h1>
                        <p>Join thousands of satisfied customers who trust AL.bank for their financial needs</p>
                        <div className="hero-buttons">
                            <button className="primary-button" onClick={handleOpenAccount}>
                                Open Account <FaArrowRight />
                            </button>
                            <button className="secondary-button" onClick={() => navigate("/about")}>
                                Learn More
                            </button>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src="/api/placeholder/600/400" alt="Banking illustration" />
                    </div>
                </section>

                <section className="features-section">
                    <h2>Why Choose AL.bank?</h2>
                    <div className="features-container">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaCheckCircle />
                            </div>
                            <h3>Zero Fees</h3>
                            <p>No hidden fees, no minimum balance requirements, and no monthly service charges.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaShieldAlt />
                            </div>
                            <h3>Secure Banking</h3>
                            <p>State-of-the-art security systems to protect your assets and personal information.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaMobileAlt />
                            </div>
                            <h3>Mobile Banking</h3>
                            <p>Access your accounts anytime, anywhere with our easy-to-use mobile app.</p>
                        </div>
                    </div>
                </section>

                <section className="accounts-section">
                    <div className="section-header">
                        <h2>Account Options</h2>
                        <p>Choose the right account for your financial needs</p>
                    </div>
                    <div className="accounts-grid">
                        <div className="account-card">
                            <div className="account-icon">💳</div>
                            <h3>Checking Account</h3>
                            <p>Perfect for everyday transactions with no monthly fees</p>
                            <ul className="account-features">
                                <li>Free debit card</li>
                                <li>Unlimited transactions</li>
                                <li>Online bill pay</li>
                            </ul>
                            <button className="account-button" onClick={handleOpenAccount}>
                                Open Now <FaArrowRight />
                            </button>
                        </div>

                        <div className="account-card">
                            <div className="account-icon">💰</div>
                            <h3>Savings Account</h3>
                            <p>Grow your money with competitive interest rates</p>
                            <ul className="account-features">
                                <li>High-interest yields</li>
                                <li>No minimum balance</li>
                                <li>Automatic savings plans</li>
                            </ul>
                            <button className="account-button" onClick={handleOpenAccount}>
                                Open Now <FaArrowRight />
                            </button>
                        </div>

                        <div className="account-card highlight">
                            <div className="new-badge">New</div>
                            <div className="account-icon">
                                <FaBitcoin />
                            </div>
                            <h3>Crypto Account</h3>
                            <p>The future of banking with cryptocurrency integration</p>
                            <ul className="account-features">
                                <li>Buy and sell crypto</li>
                                <li>Secure digital wallet</li>
                                <li>Real-time crypto tracking</li>
                            </ul>
                            <button className="account-button crypto" onClick={handleCryptoAccount}>
                                Apply Now <FaArrowRight />
                            </button>
                        </div>
                    </div>
                </section>

                <section className="testimonials-section">
                    <h2>What Our Customers Say</h2>
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <div className="quote">"</div>
                            <p>Switching to AL.bank was the best financial decision I've made. The zero-fee checking account saves me hundreds every year.</p>
                            <div className="testimonial-author">
                                <div className="author-image" style={{ backgroundColor: '#e5e7eb' }}></div>
                                <div className="author-info">
                                    <h4>Sarah Johnson</h4>
                                    <p>Customer since 2020</p>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="quote">"</div>
                            <p>The mobile banking app is incredible! I can deposit checks, transfer money, and pay bills all from my phone. Banking has never been easier.</p>
                            <div className="testimonial-author">
                                <div className="author-image" style={{ backgroundColor: '#e5e7eb' }}></div>
                                <div className="author-info">
                                    <h4>Michael Chen</h4>
                                    <p>Customer since 2021</p>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="quote">"</div>
                            <p>The customer service at AL.bank is exceptional. They helped me set up my savings goals and now I'm on track to buy my first home!</p>
                            <div className="testimonial-author">
                                <div className="author-image" style={{ backgroundColor: '#e5e7eb' }}></div>
                                <div className="author-info">
                                    <h4>Olivia Martinez</h4>
                                    <p>Customer since 2019</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-section">
                    <div className="cta-content">
                        <h2>Ready to Experience Better Banking?</h2>
                        <p>Open an account in minutes and start enjoying zero-fee banking today.</p>
                        <button className="primary-button large" onClick={handleOpenAccount}>
                            Get Started <FaArrowRight />
                        </button>
                    </div>
                </section>
            </main>

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

export default Home;