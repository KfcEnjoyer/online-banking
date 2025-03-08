import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../helpers/axiosInstance";
import { AuthContext } from "../helpers/AuthContext";
import "./styles/AccountSettings.css";
import { FaUser, FaEnvelope, FaPhone, FaHome, FaLock, FaBell, FaShieldAlt, FaChevronRight, FaBars, FaSave, FaSignOutAlt } from "react-icons/fa";

function AccountSettings() {
    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const { authData, logout } = useContext(AuthContext);

    // Profile state
    const [profile, setProfile] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        primaryAddress: "",
        secondaryAddress: "",
        city: "",
        state: "",
        country: "",
        zipCode: ""
    });

    // Password state
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    // Notifications state
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        smsNotifications: true,
        accountAlerts: true,
        marketingEmails: false,
        securityAlerts: true
    });

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        // Load user profile data
        fetchUserProfile();

        // Adjust sidebar based on screen size
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [navigate]);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/profile");
            
            if (response.data) {
                setProfile({
                    firstName: response.data.firstName || "",
                    middleName: response.data.middleName || "",
                    lastName: response.data.lastName || "",
                    email: response.data.email || "",
                    phoneNumber: response.data.phoneNumber || "",
                    primaryAddress: response.data.primaryAddress || "",
                    secondaryAddress: response.data.secondaryAddress || "",
                    city: response.data.city || "",
                    state: response.data.state || "",
                    country: response.data.country || "",
                    zipCode: response.data.zipCode || ""
                });
                
                // In a real application, notification preferences would also be fetched
                // This is placeholder code since your model doesn't have these fields yet
                setNotifications({
                    emailNotifications: true,
                    smsNotifications: true,
                    accountAlerts: true,
                    marketingEmails: false,
                    securityAlerts: true
                });
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            setError(error.response?.data?.error || "Failed to load user profile");
        } finally {
            setLoading(false);
        }
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value
        });
    };

    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setNotifications({
            ...notifications,
            [name]: checked
        });
    };

    const updateProfile = async () => {
        try {
            setSaveLoading(true);
            setError("");
            setSuccess("");
            
            const response = await axiosInstance.put("/profile/update", profile);
            setSuccess("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            setError(error.response?.data?.error || "Failed to update profile");
        } finally {
            setSaveLoading(false);
        }
    };

    const updatePassword = async () => {
        // Validate passwords
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError("New passwords do not match");
            return;
        }

        if (passwordData.newPassword.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        try {
            setSaveLoading(true);
            setError("");
            setSuccess("");
            
            const response = await axiosInstance.put("/profile/password", {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });

            setSuccess("Password updated successfully!");
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        } catch (error) {
            console.error("Error updating password:", error);
            setError(error.response?.data?.error || "Failed to update password");
        } finally {
            setSaveLoading(false);
        }
    };

    const updateNotifications = async () => {
        try {
            setSaveLoading(true);
            setError("");
            setSuccess("");
            
            // This would connect to your API endpoint for notification preferences
            // For now, we'll just simulate a successful response
            await new Promise(resolve => setTimeout(resolve, 800));
            
            setSuccess("Notification preferences updated!");
        } catch (error) {
            console.error("Error updating notifications:", error);
            setError(error.response?.data?.error || "Failed to update notification preferences");
        } finally {
            setSaveLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="settings-container">
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <h1>AL.bank</h1>
                    </div>
                    <nav className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
                        <Link to="/getaccounts">Dashboard</Link>
                        <Link to="/transfer">Transfer</Link>
                        <Link to="/deposit">Deposit</Link>
                        <Link to="/profile" className="active">Settings</Link>
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

            <main className="settings-content">
                <div className="page-title">
                    <h1>Account Settings</h1>
                    <p>Manage your profile, security, and preferences</p>
                </div>

                <div className="settings-layout">
                    <aside className={`settings-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                       
                        <div className="sidebar-menu">
                            <button 
                                className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`} 
                                onClick={() => setActiveTab('profile')}
                            >
                                <FaUser /> <span>Personal Information</span>
                            </button>
                            <button 
                                className={`sidebar-item ${activeTab === 'address' ? 'active' : ''}`} 
                                onClick={() => setActiveTab('address')}
                            >
                                <FaHome /> <span>Address Information</span>
                            </button>
                            <button 
                                className={`sidebar-item ${activeTab === 'security' ? 'active' : ''}`} 
                                onClick={() => setActiveTab('security')}
                            >
                                <FaShieldAlt /> <span>Security & Password</span>
                            </button>
                            <button 
                                className={`sidebar-item ${activeTab === 'notifications' ? 'active' : ''}`} 
                                onClick={() => setActiveTab('notifications')}
                            >
                                <FaBell /> <span>Notification Preferences</span>
                            </button>
                        </div>
                    </aside>

                    <div className="settings-main">
                        {loading ? (
                            <div className="loading-container">
                                <div className="loading-spinner"></div>
                                <p>Loading your profile information...</p>
                            </div>
                        ) : (
                            <div className="settings-panel">
                                {success && <div className="success-message">{success}</div>}
                                {error && <div className="error-message">{error}</div>}

                                {activeTab === 'profile' && (
                                    <div className="panel-content">
                                        <h2><FaUser /> Personal Information</h2>
                                        <p className="panel-description">Update your personal details and contact information</p>
                                        
                                        <div className="settings-form">
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label htmlFor="firstName">First Name</label>
                                                    <input
                                                        type="text"
                                                        id="firstName"
                                                        name="firstName"
                                                        value={profile.firstName}
                                                        onChange={handleProfileChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="middleName">Middle Name (Optional)</label>
                                                    <input
                                                        type="text"
                                                        id="middleName"
                                                        name="middleName"
                                                        value={profile.middleName}
                                                        onChange={handleProfileChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="lastName">Last Name</label>
                                                    <input
                                                        type="text"
                                                        id="lastName"
                                                        name="lastName"
                                                        value={profile.lastName}
                                                        onChange={handleProfileChange}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label htmlFor="email"><FaEnvelope /> Email Address</label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={profile.email}
                                                        onChange={handleProfileChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="phoneNumber"><FaPhone /> Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        id="phoneNumber"
                                                        name="phoneNumber"
                                                        value={profile.phoneNumber}
                                                        onChange={handleProfileChange}
                                                    />
                                                </div>
                                            </div>

                                            <button 
                                                className="save-button" 
                                                onClick={updateProfile}
                                                disabled={saveLoading}
                                            >
                                                {saveLoading ? (
                                                    <span className="loading-spinner"></span>
                                                ) : (
                                                    <>
                                                        <FaSave /> Save Changes
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'address' && (
                                    <div className="panel-content">
                                        <h2><FaHome /> Address Information</h2>
                                        <p className="panel-description">Update your residential and mailing address details</p>
                                        
                                        <div className="settings-form">
                                            <div className="form-group">
                                                <label htmlFor="primaryAddress">Street Address</label>
                                                <input
                                                    type="text"
                                                    id="primaryAddress"
                                                    name="primaryAddress"
                                                    value={profile.primaryAddress}
                                                    onChange={handleProfileChange}
                                                />
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="secondaryAddress">Apartment, Suite, Unit, etc. (Optional)</label>
                                                <input
                                                    type="text"
                                                    id="secondaryAddress"
                                                    name="secondaryAddress"
                                                    value={profile.secondaryAddress}
                                                    onChange={handleProfileChange}
                                                />
                                            </div>
                                            
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label htmlFor="city">City</label>
                                                    <input
                                                        type="text"
                                                        id="city"
                                                        name="city"
                                                        value={profile.city}
                                                        onChange={handleProfileChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="state">State/Province</label>
                                                    <input
                                                        type="text"
                                                        id="state"
                                                        name="state"
                                                        value={profile.state}
                                                        onChange={handleProfileChange}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label htmlFor="zipCode">Zip/Postal Code</label>
                                                    <input
                                                        type="text"
                                                        id="zipCode"
                                                        name="zipCode"
                                                        value={profile.zipCode}
                                                        onChange={handleProfileChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="country">Country</label>
                                                    <input
                                                        type="text"
                                                        id="country"
                                                        name="country"
                                                        value={profile.country}
                                                        onChange={handleProfileChange}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <button 
                                                className="save-button" 
                                                onClick={updateProfile}
                                                disabled={saveLoading}
                                            >
                                                {saveLoading ? (
                                                    <span className="loading-spinner"></span>
                                                ) : (
                                                    <>
                                                        <FaSave /> Save Changes
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'security' && (
                                    <div className="panel-content">
                                        <h2><FaShieldAlt /> Security & Password</h2>
                                        <p className="panel-description">Change your password and manage security settings</p>
                                        
                                        <div className="settings-form">
                                            <div className="form-group">
                                                <label htmlFor="currentPassword"><FaLock /> Current Password</label>
                                                <input
                                                    type="password"
                                                    id="currentPassword"
                                                    name="currentPassword"
                                                    value={passwordData.currentPassword}
                                                    onChange={handlePasswordChange}
                                                    placeholder="Enter your current password"
                                                />
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="newPassword"><FaLock /> New Password</label>
                                                <input
                                                    type="password"
                                                    id="newPassword"
                                                    name="newPassword"
                                                    value={passwordData.newPassword}
                                                    onChange={handlePasswordChange}
                                                    placeholder="Enter new password (min. 8 characters)"
                                                />
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="confirmPassword"><FaLock /> Confirm New Password</label>
                                                <input
                                                    type="password"
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    value={passwordData.confirmPassword}
                                                    onChange={handlePasswordChange}
                                                    placeholder="Confirm your new password"
                                                />
                                            </div>
                                            
                                            <div className="password-requirements">
                                                <h4>Password Requirements:</h4>
                                                <ul>
                                                    <li>At least 8 characters</li>
                                                    <li>Include at least one uppercase letter</li>
                                                    <li>Include at least one number</li>
                                                    <li>Include at least one special character</li>
                                                </ul>
                                            </div>
                                            
                                            <button 
                                                className="save-button" 
                                                onClick={updatePassword}
                                                disabled={saveLoading}
                                            >
                                                {saveLoading ? (
                                                    <span className="loading-spinner"></span>
                                                ) : (
                                                    <>
                                                        <FaSave /> Update Password
                                                    </>
                                                )}
                                            </button>
                                            
                                            <div className="security-options">
                                                <h3>Additional Security Options</h3>
                                                <div className="security-option">
                                                    <div className="security-option-info">
                                                        <h4>Two-Factor Authentication</h4>
                                                        <p>Add an extra layer of security to your account</p>
                                                    </div>
                                                    <button className="secondary-button">Enable</button>
                                                </div>
                                                
                                                <div className="security-option">
                                                    <div className="security-option-info">
                                                        <h4>Login Notifications</h4>
                                                        <p>Get alerted when someone logs into your account</p>
                                                    </div>
                                                    <button className="secondary-button">Configure</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'notifications' && (
                                    <div className="panel-content">
                                        <h2><FaBell /> Notification Preferences</h2>
                                        <p className="panel-description">Manage how and when you receive notifications</p>
                                        
                                        <div className="settings-form">
                                            <div className="notification-options">
                                                <div className="notification-group">
                                                    <h3>Communication Channels</h3>
                                                    <div className="notification-option">
                                                        <div className="notification-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                id="emailNotifications"
                                                                name="emailNotifications"
                                                                checked={notifications.emailNotifications}
                                                                onChange={handleNotificationChange}
                                                            />
                                                            <label htmlFor="emailNotifications">Email Notifications</label>
                                                        </div>
                                                        <p>Receive important updates and alerts via email</p>
                                                    </div>
                                                    
                                                    <div className="notification-option">
                                                        <div className="notification-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                id="smsNotifications"
                                                                name="smsNotifications"
                                                                checked={notifications.smsNotifications}
                                                                onChange={handleNotificationChange}
                                                            />
                                                            <label htmlFor="smsNotifications">SMS/Text Notifications</label>
                                                        </div>
                                                        <p>Get text alerts for important account activities</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="notification-group">
                                                    <h3>Account Notifications</h3>
                                                    <div className="notification-option">
                                                        <div className="notification-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                id="accountAlerts"
                                                                name="accountAlerts"
                                                                checked={notifications.accountAlerts}
                                                                onChange={handleNotificationChange}
                                                            />
                                                            <label htmlFor="accountAlerts">Account Activity Alerts</label>
                                                        </div>
                                                        <p>Receive alerts for deposits, withdrawals, and transfers</p>
                                                    </div>
                                                    
                                                    <div className="notification-option">
                                                        <div className="notification-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                id="securityAlerts"
                                                                name="securityAlerts"
                                                                checked={notifications.securityAlerts}
                                                                onChange={handleNotificationChange}
                                                            />
                                                            <label htmlFor="securityAlerts">Security Alerts</label>
                                                        </div>
                                                        <p>Be notified about password changes and login attempts</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="notification-group">
                                                    <h3>Marketing Preferences</h3>
                                                    <div className="notification-option">
                                                        <div className="notification-checkbox">
                                                            <input
                                                                type="checkbox"
                                                                id="marketingEmails"
                                                                name="marketingEmails"
                                                                checked={notifications.marketingEmails}
                                                                onChange={handleNotificationChange}
                                                            />
                                                            <label htmlFor="marketingEmails">Marketing Communications</label>
                                                        </div>
                                                        <p>Receive product updates, offers, and newsletters</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <button 
                                                className="save-button" 
                                                onClick={updateNotifications}
                                                disabled={saveLoading}
                                            >
                                                {saveLoading ? (
                                                    <span className="loading-spinner"></span>
                                                ) : (
                                                    <>
                                                        <FaSave /> Save Preferences
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
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

export default AccountSettings;