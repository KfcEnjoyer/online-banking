const express = require("express");
const { accounts } = require("../models");
const authenticatedUser = require("../middlewares/AuthMiddlewares");
const router = express.Router();

router.get("/:accountNumber", authenticatedUser, async (req, res) => {
    const { accountNumber } = req.params;

    try {
        const account = await accounts.findOne({
            where: { accountNumber: accountNumber, userId: req.user.id },
        });

        if (!account) {
            return res.status(404).json({ error: "Account not found" });
        }

        res.status(200).json({
            accountNumber: account.accountNumber,
            accountType: account.accountType,
            balance: account.balance,
        });
    } catch (error) {
        console.error("Error fetching account details:", error);
        res.status(500).json({ error: "Failed to fetch account details" });
    }
});

module.exports = router;
