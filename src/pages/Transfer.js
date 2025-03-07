import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../helpers/axiosInstance";
import { FaExchangeAlt, FaArrowRight, FaTimes, FaBars, FaCheck } from "react-icons/fa";
import axios from "axios";
import "./styles/Transfer.css";

function Transfer() {
    const [accounts, setAccounts] = useState([]);
    const [originalAccount, setOriginalAccount] = useState("");
    const [targetAccount, setTargetAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [transferSuccess, setTransferSuccess] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        const fetchAccountsData = async () => {
            setLoading(true);
            const token = localStorage.getItem("token");

            if (!token) {
                alert("You are not logged in!");
                nav("/login");
                return;
            }

            try {
                const response = await axiosInstance.get("/openaccount/get", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (Array.isArray(response.data)) {
                    setAccounts(response.data);
                } else {
                    console.error("Expected an array of accounts, but got:", response.data);
                    setAccounts([]);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching accounts:", error);
                setLoading(false);
            }
        };

        fetchAccountsData();
    }, [nav]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!originalAccount) {
            newErrors.originalAccount = "Please select a source account";
        }
        
        if (!targetAccount) {
            newErrors.targetAccount = "Please select a destination account";
        }
        
        if (!amount || parseFloat(amount) <= 0) {
            newErrors.amount = "Please enter a valid amount greater than 0";
        } else {
            const sourceAccount = accounts.find(acc => acc.accountNumber === originalAccount);
            if (sourceAccount && parseFloat(amount) > sourceAccount.balance) {
                newErrors.amount = "Insufficient funds in the selected account";
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You are not logged in!");
            nav("/login");
            return;
        }

        const data = { 
            originalAccount, 
            targetAccount, 
            amount: parseFloat(amount) 
        };

        axios.post("http://127.0.0.1:3001/transfer", data, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            console.log("Transfer successful:", response.data);
            setTransferSuccess(true);
            setIsSubmitting(false);
            setTimeout(() => {
                nav("/getaccounts");
            }, 2000);
        })
        .catch((error) => {
            console.error("Error:", error.response ? error.response.data : error.message);
            setErrors({ 
                submit: error.response?.data?.error || "Transfer failed. Please try again." 
            });
            setIsSubmitting(false);
        });
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        nav("/login");
    };

    // Find selected source account
    const selectedSourceAccount = accounts.find(acc => acc.accountNumber === originalAccount);

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    // Get account type icon
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
        <div className="transfer-container">
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

            <main className="main-content">
                <div className="breadcrumb">
                    <Link to="/getaccounts" className="back-link">
                        <FaArrowRight className="back-icon" /> Back to Accounts
                    </Link>
                </div>

                <section className="transfer-section">
                    <div className="section-header">
                        <FaExchangeAlt className="section-icon" />
                        <h1>Transfer Money</h1>
                    </div>
                    
                    <p className="section-description">
                        Transfer funds between your accounts quickly and securely.
                    </p>

                    {loading ? (
                        <div className="loading-spinner-container">
                            <div className="spinner"></div>
                            <p>Loading your accounts...</p>
                        </div>
                    ) : transferSuccess ? (
                        <div className="success-message">
                            <div className="success-icon">
                                <FaCheck />
                            </div>
                            <h2>Transfer Successful!</h2>
                            <p>Your transfer has been processed successfully.</p>
                            <p>Redirecting to your accounts...</p>
                        </div>
                    ) : accounts.length < 2 ? (
                        <div className="info-message">
                            <h2>Insufficient Accounts</h2>
                            <p>You need at least two accounts to make a transfer.</p>
                            <Link to="/openaccount" className="primary-button">
                                Open a New Account
                            </Link>
                        </div>
                    ) : (
                        <div className="transfer-form-container">
                            <div className="transfer-form">
                                <div className="form-group">
                                    <label htmlFor="fromAccount">From Account</label>
                                    <select 
                                        id="fromAccount"
                                        value={originalAccount}
                                        onChange={(e) => setOriginalAccount(e.target.value)}
                                        className={errors.originalAccount ? "error" : ""}
                                    >
                                        <option value="">-- Select Source Account --</option>
                                        {accounts
                                            .filter((account) => account.accountNumber !== targetAccount)
                                            .map((account) => (
                                                <option key={account.accountNumber} value={account.accountNumber}>
                                                    {getAccountIcon(account.accountType)} {account.accountType} - {account.accountNumber.substring(account.accountNumber.length - 4)} ({formatCurrency(account.balance)})
                                                </option>
                                            ))}
                                    </select>
                                    {errors.originalAccount && <div className="error-message">{errors.originalAccount}</div>}
                                </div>
                                
                                {originalAccount && (
                                    <div className="account-detail-card">
                                        <div className="account-icon">{getAccountIcon(selectedSourceAccount?.accountType)}</div>
                                        <div className="account-details">
                                            <div className="account-number">
                                                {selectedSourceAccount?.accountNumber}
                                            </div>
                                            <div className="account-type">
                                                {selectedSourceAccount?.accountType} Account
                                            </div>
                                            <div className="account-balance">
                                                Balance: {formatCurrency(selectedSourceAccount?.balance)}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="transfer-arrow">
                                    <FaArrowRight />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="toAccount">To Account</label>
                                    <select 
                                        id="toAccount"
                                        value={targetAccount}
                                        onChange={(e) => setTargetAccount(e.target.value)}
                                        className={errors.targetAccount ? "error" : ""}
                                    >
                                        <option value="">-- Select Destination Account --</option>
                                        {accounts
                                            .filter((account) => account.accountNumber !== originalAccount)
                                            .map((account) => (
                                                <option key={account.accountNumber} value={account.accountNumber}>
                                                    {getAccountIcon(account.accountType)} {account.accountType} - {account.accountNumber.substring(account.accountNumber.length - 4)} ({formatCurrency(account.balance)})
                                                </option>
                                            ))}
                                    </select>
                                    {errors.targetAccount && <div className="error-message">{errors.targetAccount}</div>}
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="amount">Amount</label>
                                    <div className="amount-input-container">
                                        <span className="currency-symbol">$</span>
                                        <input 
                                            type="number" 
                                            id="amount"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            min="0.01"
                                            step="0.01"
                                            className={errors.amount ? "error" : ""}
                                        />
                                    </div>
                                    {errors.amount && <div className="error-message">{errors.amount}</div>}
                                </div>
                                
                                {errors.submit && <div className="error-banner">{errors.submit}</div>}
                                
                                <div className="form-actions">
                                    <Link to="/getaccounts" className="secondary-button">Cancel</Link>
                                    <button 
                                        type="button" 
                                        className="primary-button"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span className="loading-spinner-small"></span>
                                        ) : (
                                            <>Transfer Funds</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
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

export default Transfer;