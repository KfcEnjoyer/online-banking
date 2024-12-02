// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./helpers/AuthContext"; // Import the AuthProvider
import Login from "./pages/Login"; // Your Login component
import Home from "./pages/Home"; // Your Home component (for example)
import OpenAccount from "./pages/openAccount";
import OetAccounts from "./pages/getAccounts";
import WelcomePage from "./pages/WelcomePage";
import Transfer from "./pages/Transfer";


function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/openaccount" element={<OpenAccount />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/getaccounts" element={<OetAccounts />} />
                    <Route path="/transfer" element={<Transfer />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
