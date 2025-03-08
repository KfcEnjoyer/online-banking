    const express = require("express");
    const router = express.Router();
    const { users, accounts } = require("../models");
    const bcrypt = require('bcrypt');
    const authenticatedUser = require("../middlewares/AuthMiddlewares");
    const {sign} = require("jsonwebtoken");
    const secret_key = "importantSecret";


    function generateRandomAccountNumber() {
        return String(Math.floor(1000000000 + Math.random() * 9000000000));
    }

    async function userExists(email) {
        const user = await users.findOne({ where: { email: email } });
        return user !== null;
    }

    async function accountNumberExists(accountNumber) {
        const account = await accounts.findOne({ where: { accountNumber: accountNumber } });
        return account !== null;
    }
  
    router.get("/get", authenticatedUser, async (req, res) => {
        try {
            const userId = req.user.id;
            console.log(userId);

            const accountsData = await accounts.findAll({ where: { userId } });

            if (!accountsData || accountsData.length === 0) {
                return res.status(404).json({ error: "No accounts found for this user" });
            }

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

    router.post("/create", async (req, res) => {
        try {
            const { firstName, middleName, lastName, email, password, phoneNumber, primaryAddress, secondaryAddress, city, state, country, zipCode, accountType } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            if (await userExists(email)) {
                res.status(400).json({ error: "Email already in use" });
            }

            const newUser = await users.create({
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
                phoneNumber: phoneNumber,
                primaryAddress: primaryAddress,
                secondaryAddress: secondaryAddress,
                city: city,
                state: state,
                country: country,
                zipCode: zipCode,
            })

            const payload = {
                id: newUser.id,
                email: newUser.email,
            };
            const token = sign(payload, secret_key, { expiresIn: "1h" });


            res.status(201).json({
                message: "Account created successfully",
                userId: newUser.id,
                token: token,
            });
        } catch (error) {
            console.error("Error creating account:", error);
            res.status(500).json({ error: "Failed to create account" });
        }
    });

    router.post("/open", authenticatedUser, async (req, res) => {
        const { accountType } = req.body;
        const userId = req.user.id;

        try {
            let accountNumber = generateRandomAccountNumber();
            while (await accountNumberExists(accountNumber)) {
                accountNumber = generateRandomAccountNumber();
            }

            const newAccount = await accounts.create({
                userId: userId,
                accountNumber: accountNumber,
                accountType: accountType
            });

            res.status(201).json({
                message: "Account opened successfully",
                accountNumber: newAccount.accountNumber,
                accountType: newAccount.accountType
            });
        } catch (error) {
            console.error("Error opening account:", error);
            res.status(500).json({ error: "Failed to open account" });
        }
    });



    module.exports = router;
