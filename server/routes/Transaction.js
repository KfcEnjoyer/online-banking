const express = require('express');
const { transactions, transfers } = require('../models'); // Import the transaction model
const authenticatedUser = require('../middlewares/AuthMiddlewares'); // Middleware to authenticate the user
const router = express.Router();

// Route to get transaction history for a specific account
router.get('/:accountNumber', authenticatedUser, async (req, res) => {
    const { accountNumber } = req.params; // Capture accountNumber from URL

    try {
        const transactionHistory = await transactions.findAll({
            where: { account: accountNumber },
            order: [['date', 'DESC']],
        });
        if (!transactionHistory.length) {
            return res.status(404).json({ message: 'No transactions found for this account.' });
        }

        res.status(200).json(transactionHistory); // Return the transaction history
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        res.status(500).json({ error: 'Failed to fetch transaction history.' });
    }
});

router.get('/transfers/:accountNumber', authenticatedUser, async (req, res) => {
    const { accountNumber } = req.params; // Capture accountNumber from URL

    try {
        const transferHistory = await transfers.findAll({
            where: { originalAccount: accountNumber },
            order: [['date', 'DESC']],
        });
        if (!transferHistory.length) {
            return res.status(404).json({ message: 'No transactions found for this account.' });
        }

        res.status(200).json(transferHistory); // Return the transaction history
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        res.status(500).json({ error: 'Failed to fetch transaction history.' });
    }
});


module.exports = router;
