import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Transactions = () => {
    const { accountNumber } = useParams(); // Get accountNumber from URL parameters
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the transaction history from the backend
        const fetchTransactionHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get(`http://172.24.2.169:3001/transactions/${accountNumber}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send the token for authentication
                    },
                });

                setTransactions(response.data); // Set the transactions in the state
            } catch (err) {
                console.error("Error fetching transactions:", err);
                setError("Failed to fetch transactions.");
            }
        };

        if (accountNumber) {
            fetchTransactionHistory(); // Call the function to fetch transactions
        }
    }, [accountNumber]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!transactions.length) {
        return <div>No transactions found for this account.</div>;
    }

    return (
        <div>
            <h1>Transaction History for Account: {accountNumber}</h1>
            <table>
                <thead>
                <tr>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Old Balance</th>
                    <th>New Balance</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.transactionId}>
                        <td>{transaction.transactionId}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.status}</td>
                        <td>{new Date(transaction.date).toLocaleString()}</td>
                        <td>{transaction.oldBalance}</td>
                        <td>{transaction.newBalance}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;
