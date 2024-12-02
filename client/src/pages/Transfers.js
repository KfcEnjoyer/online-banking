import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Transfers = () => {
    const { accountNumber } = useParams(); // Get accountNumber from URL parameters
    const [transfers, setTransfers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the transaction history from the backend
        const fetchTransferHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get(`http://172.24.2.169:3001/transactions/transfers/${accountNumber}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send the token for authentication
                    },
                });

                setTransfers(response.data); // Set the transactions in the state
            } catch (err) {
                console.error("Error fetching transactions:", err);
                setError("Failed to fetch transactions.");
            }
        };

        if (accountNumber) {
            fetchTransferHistory(); // Call the function to fetch transactions
        }
    }, [accountNumber]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!transfers.length) {
        return <div>No transactions found for this account.</div>;
    }

    return (
        <div>
            <h1>Transaction History for Account: {accountNumber}</h1>
            <table>
                <thead>
                <tr>
                    <th>Transaction ID</th>
                    <th>Account Number</th>
                    <th>Target Account Number</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Old Balance</th>
                    <th>New Balance</th>
                </tr>
                </thead>
                <tbody>
                {transfers.map((transfer) => (
                    <tr key={transfer.transferId}>
                        <td>{transfer.transferId}</td>
                        <td>{transfer.originalAccount}</td>
                        <td>{transfer.targetAccount}</td>
                        <td>{transfer.amount}</td>
                        <td>{transfer.status}</td>
                        <td>{new Date(transfer.date).toLocaleString()}</td>
                        <td>{transfer.oldBalance}</td>
                        <td>{transfer.newBalance}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transfers;
