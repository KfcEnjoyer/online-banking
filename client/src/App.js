// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./helpers/AuthContext"; // Import the AuthProvider
import Login from "./pages/Login"; // Your Login component
import OpenAccount from "./pages/openAccount";
import GetAccounts from "./pages/getAccounts";
import WelcomePage from "./pages/WelcomePage";
import Transfer from "./pages/Transfer";
import OpenAccountLogged from "./pages/openAccountLogged";
import AccountDetails from "./pages/AccountDetails";
import Transactions from "./pages/Transactions";
import Transfers from "./pages/Transfers";
import Stocks from "./pages/Stocks";
import About from "./pages/About";
import AccountSettings from "./pages/AccountSettings";


function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/openaccount" element={<OpenAccount />} />
                    <Route path="/loggedopen" element={<OpenAccountLogged />} />
                    <Route path="/getaccounts" element={<GetAccounts />} />
                    <Route path="/profile" element={<AccountSettings />} />
                    <Route path="/transfer" element={<Transfer />} />
                    <Route path="/account/:accountNumber" element={<AccountDetails />} />
                    <Route path="/transactions/:accountNumber" element={<Transactions />} />
                    <Route path="/transactions/transfers/:accountNumber" element={<Transfers />} />
                    <Route path="/stocks" element={<Stocks />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
