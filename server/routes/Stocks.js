const express = require('express');
const yf = require('yahoo-finance2').default;
const authenticatedUser = require('../middlewares/AuthMiddlewares'); // Assuming this middleware checks the JWT
const { accounts } = require('../models'); // Import your account model to verify account type

const router = express.Router();

router.get('/top-stocks', authenticatedUser, async (req, res) => {
    try {
        // Fetch user ID from request, assuming authenticatedUser adds it
        const userId = req.user.id;

        // Check if the user has an Investments account
        const investmentsAccount = await accounts.findOne({
            where: {
                userId,
                accountType: 'Investments'
            }
        });

        if (!investmentsAccount) {
            return res.status(403).json({ error: 'Access denied. No Investments account found.' });
        }

        // Fetch top stocks
        const symbols = ['AAPL', 'AMZN', 'GOOGL', 'MSFT', 'TSLA', 'META', 'NFLX', 'NVDA', 'BABA', 'JPM'];
        const promises = symbols.map(symbol => yf.quote(symbol));
        const stockData = await Promise.all(promises);

        res.status(200).json(stockData);
    } catch (error) {
        console.error('Error fetching top stocks:', error);
        res.status(500).json({ error: 'Failed to fetch stock data.' });
    }
});

module.exports = router;
