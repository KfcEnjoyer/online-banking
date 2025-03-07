import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaDownload, FaFilter, FaBars, FaSort, FaSortUp, FaSortDown, FaExchangeAlt } from 'react-icons/fa';
import axios from 'axios';
import './styles/Transactions.css'; // Reusing the same CSS for consistency

const Transfers = () => {
    const { accountNumber } = useParams();
    const [transfers, setTransfers] = useState([]);
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [sortField, setSortField] = useState('date');
    const [sortDirection, setSortDirection] = useState('desc');
    const [filterStatus, setFilterStatus] = useState('all');
    const nav = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const accountResponse = await axios.get(`http://127.0.0.1:3001/accounts/${accountNumber}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAccount(accountResponse.data);

                const transferResponse = await axios.get(`http://127.0.0.1:3001/transactions/transfers/${accountNumber}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setTransfers(transferResponse.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch transfers. Please try again.");
                setLoading(false);
            }
        };

        if (accountNumber) {
            fetchData();
        }
    }, [accountNumber]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        nav("/login");
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    const getSortIcon = (field) => {
        if (sortField !== field) return <FaSort className="sort-icon" />;
        return sortDirection === 'asc' ? <FaSortUp className="sort-icon" /> : <FaSortDown className="sort-icon" />;
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

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    };

    const filteredAndSortedTransfers = transfers
        .filter(transfer => filterStatus === 'all' || transfer.status.toLowerCase() === filterStatus)
        .sort((a, b) => {
            if (sortField === 'date') {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
            } else if (sortField === 'amount') {
                return sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
            }
            return 0;
        });

    const getStatusBadgeClass = (status) => {
        switch(status?.toLowerCase()) {
            case 'completed':
                return 'status-completed';
            case 'pending':
                return 'status-pending';
            case 'failed':
                return 'status-failed';
            default:
                return 'status-default';
        }
    };

    // Determine if this account is source or destination
    const isSourceAccount = (transfer) => {
        return transfer.originalAccount === accountNumber;
    };

    return (
        <div className="transactions-container">
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
                    <Link to={`/account/${accountNumber}`} className="back-link">
                        <FaArrowLeft /> Back to Account
                    </Link>
                </div>

                {loading ? (
                    <div className="loading-spinner-container">
                        <div className="spinner"></div>
                        <p>Loading transfers...</p>
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
                ) : (
                    <>
                        <div className="account-header">
                            <div className="account-info">
                                <div className="account-icon">{getAccountIcon(account?.accountType)}</div>
                                <div className="account-details">
                                    <h1>Transfer History</h1>
                                    <p className="account-number">{account?.accountType} Account: {accountNumber}</p>
                                </div>
                            </div>
                            <div className="account-balance">
                                <div className="balance-label">Current Balance</div>
                                <div className="balance-amount">{formatCurrency(account?.balance || 0)}</div>
                            </div>
                        </div>

                        <div className="transactions-controls">
                            <div className="filter-container">
                                <label htmlFor="status-filter">
                                    <FaFilter /> Filter:
                                </label>
                                <select 
                                    id="status-filter" 
                                    value={filterStatus} 
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="all">All Transfers</option>
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                    <option value="failed">Failed</option>
                                </select>
                            </div>
                            <button className="secondary-button">
                                <FaDownload /> Export
                            </button>
                        </div>

                        {filteredAndSortedTransfers.length === 0 ? (
                            <div className="no-transactions">
                                <p>No transfers found for this account.</p>
                                <Link to="/transfer" className="primary-button">Make a Transfer</Link>
                            </div>
                        ) : (
                            <div className="transactions-table-container">
                                <table className="transactions-table">
                                    <thead>
                                        <tr>
                                            <th onClick={() => handleSort('transferId')}>
                                                Transfer ID {getSortIcon('transferId')}
                                            </th>
                                            <th>
                                                Type
                                            </th>
                                            <th>
                                                {/* This column will show source or destination account depending on direction */}
                                                Related Account
                                            </th>
                                            <th onClick={() => handleSort('amount')}>
                                                Amount {getSortIcon('amount')}
                                            </th>
                                            <th onClick={() => handleSort('status')}>
                                                Status {getSortIcon('status')}
                                            </th>
                                            <th onClick={() => handleSort('date')}>
                                                Date {getSortIcon('date')}
                                            </th>
                                            <th>Old Balance</th>
                                            <th>New Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAndSortedTransfers.map((transfer) => {
                                            const isSource = isSourceAccount(transfer);
                                            return (
                                                <tr key={transfer.transferId}>
                                                    <td className="transaction-id">{transfer.transferId}</td>
                                                    <td className={isSource ? 'outgoing' : 'incoming'}>
                                                        {isSource ? 'Outgoing' : 'Incoming'}
                                                    </td>
                                                    <td>
                                                        {isSource 
                                                            ? `To: ${transfer.targetAccount}` 
                                                            : `From: ${transfer.originalAccount}`
                                                        }
                                                    </td>
                                                    <td className={`transaction-amount ${isSource ? 'negative' : 'positive'}`}>
                                                        {isSource ? '-' : '+'}{formatCurrency(transfer.amount)}
                                                    </td>
                                                    <td>
                                                        <span className={`status-badge ${getStatusBadgeClass(transfer.status)}`}>
                                                            {transfer.status}
                                                        </span>
                                                    </td>
                                                    <td>{new Date(transfer.date).toLocaleString()}</td>
                                                    <td>{formatCurrency(transfer.oldBalance)}</td>
                                                    <td>{formatCurrency(transfer.newBalance)}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
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
};

export default Transfers;