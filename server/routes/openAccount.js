    const express = require("express");
    const router = express.Router();
    const { users, accounts } = require("../models");
    console.log(accounts)
    const authenticatedUser = require("../middlewares/AuthMiddlewares"); // Import your middleware

    function generateRandomAccountNumber() {
        return String(Math.floor(1000000000 + Math.random() * 9000000000));  // Return as string
    }


    // Function to check if account number exists in accounts table
    async function accountNumberExists(accountNumber) {
        const account = await accounts.findOne({ where: { accountNumber: accountNumber } });
        return account !== null;
    }
    // GET /openaccount route
    // GET /openaccount route
    router.get("/get", authenticatedUser, async (req, res) => {
        try {
            const userId = req.user.id; // Extracted from JWT via middleware
            console.log(userId);

            // Fetch all accounts for the user
            const accountsData = await accounts.findAll({ where: { userId } });

            if (!accountsData || accountsData.length === 0) {
                return res.status(404).json({ error: "No accounts found for this user" });
            }

            // Map the account data to return relevant fields
            const data = accountsData.map(account => ({
                accountNumber: account.accountNumber,
                accountType: account.accountType,
                balance: account.balance,
            }));

            res.status(200).json(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({ error: "Failed to fetch user details" });
        }
    });


    router.post("/open", authenticatedUser, async (req, res) => {
        try {
            const { accountType } = req.body;  // Only accountType needed
            const userId = req.user.id;  // Retrieved from JWT

            // Generate a unique account number
            let accountNumber = generateRandomAccountNumber();
            while (await accountNumberExists(accountNumber)) {
                accountNumber = generateRandomAccountNumber();
            }
            console.log(accountType);
            // Create the new account without firstName, lastName, and phoneNumber
            const newAccount = await accounts.create({
                userId,
                accountNumber,
                accountType,  // Ensures accountType is passed correctly
            });

            res.status(201).json({
                message: "Account created successfully",
                accountNumber: newAccount.accountNumber,
            });
        } catch (error) {
            console.error("Error creating account:", error);
            res.status(500).json({ error: "Failed to create account" });
        }
    });



    module.exports = router;
