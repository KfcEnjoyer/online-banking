import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To access URL params
import axios from "axios";

const AccountDetails = () => {
    const { accountNumber } = useParams(); // Get accountNumber from URL parameters
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAccountDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log(token);
                if (!token) {
                    throw new Error("No token found");
                }

                // Make the API request to fetch account details
                const response = await axios.get(`http://172.24.2.169:3001/accounts/${accountNumber}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Set account data
                setAccount(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching account details:", err);
                setError("Failed to fetch account details. Please try again.");
            }
        };

        if (accountNumber) {
            getAccountDetails(); // Fetch account details
        }
    }, [accountNumber]); // Re-run the effect if accountNumber changes

    if (error) {
        return <div>{error}</div>;
    }

    if (loading) {
        return <div><h2>Loading account data</h2></div>
    }

    if (!account) {
        return <div>Account not found.</div>;
    }

    return (
        <div>
            <h1>Account Details</h1>
            <p>Account Number: {account.accountNumber}</p>
            <p>Account Type: {account.accountType}</p>
            <p>Balance: ${account.balance}</p>
            <a href={"/transactions/" + account.accountNumber}><p>Transaction History:</p></a>
            <a href={"/transactions/transfers/" + account.accountNumber}><p>Transfers:</p></a>
            <a href="/transfer"><p>Make a transfer:</p></a>
            <button>Close the account</button>
        </div>
    );
};

export default AccountDetails;
