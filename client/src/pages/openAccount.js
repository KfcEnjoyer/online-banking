import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./styles/OpenAccount.css";
import { FaArrowRight, FaArrowLeft, FaTimes } from "react-icons/fa";

function OpenAccount() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const nav = useNavigate();

  const handleCardClick = (type) => {
    setSelectedAccount(type);
    setIsFormVisible(true);
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

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    phoneNumber: Yup.string().required("Phone number is required"),
    primaryAddress: Yup.string().required("Primary address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    zipCode: Yup.string().required("Zip code is required")
  });

  const onSubmit = (data) => {
    console.log("Selected account type:", selectedAccount);
   
      const formData = {
        ...data,
      };
    
      axios.post("http://127.0.0.1:3001/openaccount/create", formData)
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("token", token);
    
          return axios.post(
            "http://127.0.0.1:3001/openaccount/open",
            { accountType: selectedAccount },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        })
        .then((response) => {
          nav("/getaccounts");
        })
        .catch((error) => {
          console.error("Error:", error.response ? error.response.data : error.message);
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
    <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</header>

      <main className={`main-content ${isFormVisible ? "blurred-bg" : ""}`}>
        <section className="hero-section">
          <h1>Open an Account</h1>
          <p>Join thousands of satisfied customers who trust AL.bank for their financial needs</p>
        </section>

        {!isFormVisible && (
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
        )}

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

      {isFormVisible && (
        <div className="registration-form-container">
          <div className="registration-form">
            <button className="close-button" onClick={handleCloseForm}>
              <FaTimes />
            </button>
            
            <div className="form-header">
              <h2>{selectedAccount} Account Application</h2>
              <div className="progress-bar">
                <div className={`progress-step ${formStep >= 1 ? "active" : ""}`}>1</div>
                <div className="progress-line"></div>
                <div className={`progress-step ${formStep >= 2 ? "active" : ""}`}>2</div>
              </div>
              <p className="step-description">
                {formStep === 1 ? "Personal Information" : "Address & Security"}
              </p>
            </div>

            <Formik
              initialValues={{
                firstName: "",
                middleName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                phoneNumber: "",
                primaryAddress: "",
                secondaryAddress: "",
                city: "",
                state: "",
                country: "",
                zipCode: "",
                agreeToTerms: false
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, errors, touched }) => (
                <Form>
                  {formStep === 1 ? (
                    <div className="form-step">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <Field
                          type="text"
                          id="firstName"
                          name="firstName"
                          placeholder="Enter your first name"
                          className={errors.firstName && touched.firstName ? "input-error" : ""}
                        />
                        <ErrorMessage name="firstName" component="div" className="error-message" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="middleName">Middle Name (Optional)</label>
                        <Field
                          type="text"
                          id="middleName"
                          name="middleName"
                          placeholder="Enter your middle name"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <Field
                          type="text"
                          id="lastName"
                          name="lastName"
                          placeholder="Enter your last name"
                          className={errors.lastName && touched.lastName ? "input-error" : ""}
                        />
                        <ErrorMessage name="lastName" component="div" className="error-message" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Enter your email"
                          className={errors.email && touched.email ? "input-error" : ""}
                        />
                        <ErrorMessage name="email" component="div" className="error-message" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <Field
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          placeholder="Enter your phone number"
                          className={errors.phoneNumber && touched.phoneNumber ? "input-error" : ""}
                        />
                        <ErrorMessage name="phoneNumber" component="div" className="error-message" />
                      </div>

                      <div className="form-buttons">
                        <button type="button" className="secondary-button" onClick={handleCloseForm}>
                          Cancel
                        </button>
                        <button type="button" className="primary-button" onClick={handleNext}>
                          Next <FaArrowRight />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="form-step">
                      <div className="form-group">
                        <label htmlFor="primaryAddress">Primary Address</label>
                        <Field
                          type="text"
                          id="primaryAddress"
                          name="primaryAddress"
                          placeholder="Enter your address"
                          className={errors.primaryAddress && touched.primaryAddress ? "input-error" : ""}
                        />
                        <ErrorMessage name="primaryAddress" component="div" className="error-message" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="secondaryAddress">Secondary Address (Optional)</label>
                        <Field
                          type="text"
                          id="secondaryAddress"
                          name="secondaryAddress"
                          placeholder="Apartment, suite, etc."
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group half">
                          <label htmlFor="city">City</label>
                          <Field
                            type="text"
                            id="city"
                            name="city"
                            placeholder="City"
                            className={errors.city && touched.city ? "input-error" : ""}
                          />
                          <ErrorMessage name="city" component="div" className="error-message" />
                        </div>

                        <div className="form-group half">
                          <label htmlFor="state">State</label>
                          <Field
                            type="text"
                            id="state"
                            name="state"
                            placeholder="State"
                            className={errors.state && touched.state ? "input-error" : ""}
                          />
                          <ErrorMessage name="state" component="div" className="error-message" />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group half">
                          <label htmlFor="country">Country</label>
                          <Field
                            type="text"
                            id="country"
                            name="country"
                            placeholder="Country"
                            className={errors.country && touched.country ? "input-error" : ""}
                          />
                          <ErrorMessage name="country" component="div" className="error-message" />
                        </div>

                        <div className="form-group half">
                          <label htmlFor="zipCode">Zip Code</label>
                          <Field
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            placeholder="Zip Code"
                            className={errors.zipCode && touched.zipCode ? "input-error" : ""}
                          />
                          <ErrorMessage name="zipCode" component="div" className="error-message" />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Create a password"
                          className={errors.password && touched.password ? "input-error" : ""}
                        />
                        <ErrorMessage name="password" component="div" className="error-message" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <Field
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="Confirm your password"
                          className={errors.confirmPassword && touched.confirmPassword ? "input-error" : ""}
                        />
                        <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                      </div>

                      <div className="form-group checkbox">
                        <Field
                          type="checkbox"
                          id="agreeToTerms"
                          name="agreeToTerms"
                        />
                        <label htmlFor="agreeToTerms">I agree to the Terms and Conditions and Privacy Policy</label>
                      </div>

                      <div className="form-buttons">
                        <button type="button" className="secondary-button" onClick={handleBack}>
                          <FaArrowLeft /> Back
                        </button>
                        <button type="submit" className="primary-button">
                          Create Account
                        </button>
                      </div>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
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

export default OpenAccount;