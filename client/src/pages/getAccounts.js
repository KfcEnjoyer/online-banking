import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../helpers/axiosInstance";
import { AuthContext } from "../helpers/AuthContext";
import "./styles/GetAccounts.css";
import { FaChevronRight, FaSignOutAlt, FaBars } from "react-icons/fa";

function GetAccounts() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const nav = useNavigate();
    const { authData, logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchAccountsData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("You are not logged in!");
                nav("/login");
                return;
            }

            try {
                setLoading(true);

                const profileResponse = await axiosInstance.get("/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (profileResponse.data) {
                    const { firstName, lastName } = profileResponse.data;
                    setUserName(`${firstName || ''} ${lastName || ''}`.trim());
                }
                
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
                console.error("Error fetching user data:", error);
                setError(error.response?.data?.error || "Failed to fetch account details.");
                setLoading(false);
            }
        };

        fetchAccountsData();
    }, [nav]);

    const handleLogout = () => {
        logout(); 
        nav("/login");
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
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

    // Helper function to format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return (
        <div className="accounts-container">
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
                        <a href="#" onClick={handleLogout} className="logout-button">
                            <FaSignOutAlt /> Logout
                        </a>
                    </nav>
                    <div className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`} onClick={toggleMobileMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <section className="welcome-section">
                <h1>
                        {userName ? `Welcome, ${userName}!` : 'Welcome to AL.bank!'}
                    </h1>
                    <p>Manage your accounts and track your finances in one place</p>
                </section>

                <section className="accounts-section">
                    <h2>Your Accounts</h2>
                    
                    {loading ? (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p>Loading your accounts...</p>
                        </div>
                    ) : error ? (
                        <div className="error-message">
                            <p>{error}</p>
                            <button className="primary-button" onClick={() => window.location.reload()}>
                                Try Again
                            </button>
                        </div>
                    ) : accounts.length === 0 ? (
                        <div className="no-accounts">
                            <p>You don't have any accounts yet.</p>
                            <Link to="/loggedopen" className="primary-button">
                                Open a New Account
                            </Link>
                        </div>
                    ) : (
                        <div className="accounts-grid">
                            {accounts.map((account, index) => (
                                <div key={index} className="account-card">
                                    <div className="account-icon">
                                        {getAccountIcon(account.accountType)}
                                    </div>
                                    <div className="account-type">
                                        {account.accountType || "Account"}
                                    </div>
                                    <div className="account-number">
                                        Account: {account.accountNumber}
                                    </div>
                                    <div className="account-balance">
                                        {formatCurrency(account.balance || 0)}
                                    </div>
                                    <Link to={`/account/${account.accountNumber}`} className="view-details-btn">
                                        View Details <FaChevronRight />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="actions-section">
                    <h2>Quick Actions</h2>
                    <div className="actions-grid">
                        <Link to="/loggedopen" className="action-card">
                            <div className="action-icon">➕</div>
                            <h3>Open New Account</h3>
                            <p>Expand your financial portfolio with a new account</p>
                        </Link>
                        <Link to="/transfer" className="action-card">
                            <div className="action-icon">↔️</div>
                            <h3>Transfer Money</h3>
                            <p>Move funds between your accounts or to others</p>
                        </Link>
                        <Link to="/deposit" className="action-card">
                            <div className="action-icon">📥</div>
                            <h3>Deposit Funds</h3>
                            <p>Add money to your accounts quickly and easily</p>
                        </Link>
                        <Link to="/profile" className="action-card">
                            <div className="action-icon">⚙️</div>
                            <h3>Account Settings</h3>
                            <p>Manage your profile and security settings</p>
                        </Link>
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

export default GetAccounts;