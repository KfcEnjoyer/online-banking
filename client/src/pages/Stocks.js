import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Investments = () => {
    const [stocks, setStocks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const token = localStorage.getItem('token'); // Fetch the JWT token
                if (!token) {
                    throw new Error('You must be logged in to view this page.');
                }

                const response = await axios.get('http://172.24.2.169:3001/api/stocks/top-stocks', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token in the header
                    },
                });

                setStocks(response.data);
            } catch (err) {
                console.error('Error fetching stocks:', err);
                setError(err.response?.data?.error || 'Failed to fetch stocks.');
            }
        };

        fetchStocks();
    }, []);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!stocks.length) {
        return <div>Loading stocks...</div>;
    }

    return (
        <div className="investments">
            <h1>Top Stocks</h1>
            <table>
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Change</th>
                    <th>Change (%)</th>
                    <th>Market Cap</th>
                </tr>
                </thead>
                <tbody>
                {stocks.map(stock => (
                    <tr key={stock.symbol}>
                        <td>{stock.symbol}</td>
                        <td>{stock.shortName || stock.longName}</td>
                        <td>${stock.regularMarketPrice?.toFixed(2)}</td>
                        <td
                            style={{
                                color: stock.regularMarketChange > 0 ? 'green' : 'red',
                            }}
                        >
                            {stock.regularMarketChange?.toFixed(2)}
                        </td>
                        <td
                            style={{
                                color: stock.regularMarketChangePercent > 0 ? 'green' : 'red',
                            }}
                        >
                            {stock.regularMarketChangePercent?.toFixed(2)}%
                        </td>
                        <td>${(stock.marketCap / 1e9).toFixed(2)}B</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Investments;
