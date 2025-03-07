import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaExchangeAlt, FaHistory, FaMoneyBillWave, FaTimes, FaBars } from "react-icons/fa";
import "./styles/AccountDetails.css";

const AccountDetails = () => {
    const { accountNumber } = useParams();
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
    const [closeLoading, setCloseLoading] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        const getAccountDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No token found");
                }

                setLoading(true);
                const response = await axios.get(`http://127.0.0.1:3001/accounts/${accountNumber}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setAccount(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching account details:", err);
                setError("Failed to fetch account details. Please try again.");
                setLoading(false);
            }
        };

        if (accountNumber) {
            getAccountDetails();
        }
    }, [accountNumber]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        nav("/login");
    };

    const handleCloseAccount = async () => {
        try {
            setCloseLoading(true);
            const token = localStorage.getItem("token");
            
            // Replace with your actual API endpoint for closing accounts
            await axios.post(`http://127.0.0.1:3001/accounts/${accountNumber}/close`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            setCloseLoading(false);
            setShowCloseConfirmation(false);
            nav("/getaccounts");
        } catch (err) {
            console.error("Error closing account:", err);
            setCloseLoading(false);
            alert("Failed to close account. Please try again.");
        }
    };

    // Helper function to format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const getAccountIcon = (type) => {
        switch(type?.toLowerCase()) {
            case 'checking':
                return '💳';
            case 'savings':
                return '💰';
            case 'investment':
                return '📈';
            default:
                return '🏦';
        }
    };

    return (
        <div className="account-details-container">
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
                        <a href="#" onClick={handleLogout} className="logout-button">Logout</a>
                    </nav>
                    <div className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`} onClick={toggleMobileMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </header>

            <main className={`main-content ${showCloseConfirmation ? "blurred-bg" : ""}`}>
                <div className="breadcrumb">
                    <Link to="/getaccounts" className="back-link">
                        <FaArrowLeft /> Back to Accounts
                    </Link>
                </div>

                {loading ? (
                    <div className="loading-spinner-container">
                        <div className="spinner"></div>
                        <p>Loading account details...</p>
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <div className="error-message">
                            <p>{error}</p>
                            <button className="primary-button" onClick={() => window.location.reload()}>
                                Try Again
                            </button>
                        </div>
                    </div>
                ) : !account ? (
                    <div className="not-found-container">
                        <h2>Account Not Found</h2>
                        <p>The account you're looking for doesn't exist or you don't have access to it.</p>
                        <Link to="/getaccounts" className="primary-button">
                            Back to Your Accounts
                        </Link>
                    </div>
                ) : (
                    <div className="account-details-content">
                        <div className="account-header">
                            <div className="account-icon-large">
                                {getAccountIcon(account.accountType)}
                            </div>
                            <div className="account-title">
                                <h1>{account.accountType} Account</h1>
                                <p className="account-number">Account #: {account.accountNumber}</p>
                            </div>
                        </div>

                        <div className="balance-card">
                            <div className="balance-title">Current Balance</div>
                            <div className="balance-amount" style={{color: "white"}}>
                             {formatCurrency(account.balance)}
                            </div>
                        </div>

                        <div className="quick-actions">
                            <h2>Quick Actions</h2>
                            <div className="action-buttons">
                                <Link to={`/transactions/${account.accountNumber}`} className="action-button">
                                    <FaHistory /> Transaction History
                                </Link>
                                <Link to={`/transactions/transfers/${account.accountNumber}`} className="action-button">
                                    <FaExchangeAlt /> View Transfers
                                </Link>
                                <Link to="/transfer" className="action-button">
                                    <FaMoneyBillWave /> Make a Transfer
                                </Link>
                                <button 
                                    className="action-button danger"
                                    onClick={() => setShowCloseConfirmation(true)}
                                >
                                    <FaTimes /> Close Account
                                </button>
                            </div>
                        </div>

                        <div className="account-info-section">
                            <h2>Account Information</h2>
                            <div className="info-grid">
                                <div className="info-item">
                                    <div className="info-label">Account Type</div>
                                    <div className="info-value">{account.accountType}</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Account Number</div>
                                    <div className="info-value">{account.accountNumber}</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Current Balance</div>
                                    <div className="info-value">{formatCurrency(account.balance)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {showCloseConfirmation && (
                <div className="confirmation-modal-container">
                    <div className="confirmation-modal">
                        <button 
                            className="close-button" 
                            onClick={() => setShowCloseConfirmation(false)}
                            disabled={closeLoading}
                        >
                            <FaTimes />
                        </button>
                        
                        <div className="confirm-header">
                            <div className="confirm-icon warning">⚠️</div>
                            <h2>Close Account</h2>
                        </div>
                        
                        <div className="confirm-content">
                            <p>Are you sure you want to close your {account?.accountType} account?</p>
                            <p className="warning-text">This action cannot be undone. Any remaining balance will be transferred to your primary account.</p>
                        </div>
                        
                        <div className="confirm-actions">
                            <button 
                                type="button" 
                                className="secondary-button" 
                                onClick={() => setShowCloseConfirmation(false)}
                                disabled={closeLoading}
                            >
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                className="danger-button" 
                                onClick={handleCloseAccount}
                                disabled={closeLoading}
                            >
                                {closeLoading ? (
                                    <span className="loading-spinner-small"></span>
                                ) : (
                                    <>
                                        <FaTimes /> Close Account
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
};

export default AccountDetails;