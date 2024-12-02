const express = require("express");
const { accounts } = require("../models"); // Assuming you have an 'accounts' model
const authenticatedUser = require("../middlewares/AuthMiddlewares"); // Middleware to authenticate the user
const router = express.Router();

// Route to get account details by account number
router.get("/:accountNumber", authenticatedUser, async (req, res) => {
    const { accountNumber } = req.params; // Capture account number from URL

    try {
        // Fetch the account data by account number for the authenticated user
        const account = await accounts.findOne({
            where: { accountNumber: accountNumber, userId: req.user.id }, // Ensure it's the user's account
        });

        if (!account) {
            return res.status(404).json({ error: "Account not found" });
        }

        // Return the account details
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
