const express = require('express');
const { transactions, transfers } = require('../models');
const authenticatedUser = require('../middlewares/AuthMiddlewares');
const router = express.Router();
const { Op } = require('sequelize');

router.get('/:accountNumber', authenticatedUser, async (req, res) => {
    const { accountNumber } = req.params; 

    try {
        const transactionHistory = await transactions.findAll({
            where: { account: accountNumber },
            order: [['date', 'DESC']],
        });
        if (!transactionHistory.length) {
            return res.status(404).json({ message: 'No transactions found for this account.' });
        }

        res.status(200).json(transactionHistory); 
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        res.status(500).json({ error: 'Failed to fetch transaction history.' });
    }
});

router.get('/transfers/:accountNumber', authenticatedUser, async (req, res) => {
    const { accountNumber } = req.params; 

    try {
        const transferHistory = await transfers.findAll({
            where: {
                [Op.or]: [
                    { originalAccount: accountNumber },
                    { targetAccount: accountNumber }
                ]
            },
            order: [['date', 'DESC']],
        });
        if (!transferHistory.length) {
            return res.status(404).json({ message: 'No transactions found for this account.' });
        }

        res.status(200).json(transferHistory); 
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        res.status(500).json({ error: 'Failed to fetch transaction history.' });
    }
});


module.exports = router;
