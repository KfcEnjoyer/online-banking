    const express = require("express");
    const router = express.Router();
    const { users, accounts } = require("../models");
    console.log(accounts)
    const authenticatedUser = require("../middlewares/AuthMiddlewares");
    const {sign} = require("jsonwebtoken"); // Import your middleware
    const secret_key = "importantSecret"; // You should use environment variables in production


    function generateRandomAccountNumber() {
        return String(Math.floor(1000000000 + Math.random() * 9000000000));  // Return as string
    }

    async function userExists(email) {
        const user = await users.findOne({ where: { email: email } });
        return user !== null;
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


    router.post("/open", async (req, res) => {
        try {
            const { firstName, lastName, email, password, phoneNumber, accountType } = req.body;  // Only accountType needed

            // Generate a unique account number
            if (await userExists(email)) {
                res.status(400).json({ error: "Email already in use" });
            }

            const newUser = await users.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                phoneNumber: phoneNumber,
            })

            const payload = {
                id: newUser.id,
                email: newUser.email,
            };
            const token = sign(payload, secret_key, { expiresIn: "1h" });


            let accountNumber = generateRandomAccountNumber();
            while (await accountNumberExists(accountNumber)) {
                accountNumber = generateRandomAccountNumber();
            }

            const newAccount = await accounts.create({
                userId: newUser.id,
                accountNumber: accountNumber,
                accountType: accountType,
            });

            res.status(201).json({
                message: "Account created successfully",
                accountNumber: newAccount.accountNumber,
                userId: newUser.id,
            });
        } catch (error) {
            console.error("Error creating account:", error);
            res.status(500).json({ error: "Failed to create account" });
        }
    });



    module.exports = router;
