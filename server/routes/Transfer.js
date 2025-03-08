const express = require("express");
const router = express.Router();
const { sequelize, accounts, transactions, transfers } = require("../models");
const authenticatedUser = require("../middlewares/AuthMiddlewares");

router.post("/", authenticatedUser, async (req, res) => {
    const { originalAccount, targetAccount, amount } = req.body;

    if (!originalAccount || !targetAccount || !amount) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const t = await sequelize.transaction();
    try {

        const acc1 = await accounts.findOne({ where: { accountNumber: originalAccount }, t });
        const acc2 = await accounts.findOne({ where: { accountNumber: targetAccount }, t });

        if (!acc1 || !acc2) {
            return res.status(404).json({ error: "One or both accounts not found" });
        }

        if (parseFloat(acc1.balance) < parseFloat(amount)) {
            console.log(acc1.accountNumber);
            console.log(acc1.balance);
            console.log(amount)
            return res.status(400).json({ error: "Insufficient balance in the original account" });
        }

        const oldBalance1 = acc1.balance;
        const oldBalance2 = acc2.balance;
        acc1.balance = parseFloat(acc1.balance) - parseFloat(amount);
        await acc1.save({t});
        acc2.balance = parseFloat(acc2.balance) + parseFloat(amount);
        await acc2.save({t});

        await t.commit();

        const transfer = await transfers.create({
            originalAccount: originalAccount,
            targetAccount: targetAccount,
            amount: parseFloat(amount),
            status: "completed",
            oldBalance: oldBalance1,
            newBalance: acc1.balance,
        })

        const transaction1 = await transactions.create({
            account: originalAccount,
            amount: parseFloat(amount),
            status: "completed",
            oldBalance: oldBalance1,
            newBalance: acc1.balance,
        });

        const transaction2 = await transactions.create({
            account: targetAccount,
            amount: parseFloat(amount),
            status: "completed",
            oldBalance: oldBalance2,
            newBalance: acc2.balance,
        });

        res.status(200).json({ message: "Transfer successful",
        transactionId1: transaction1.transactionId,
        transactionId2: transaction2.transactionId,
        transferId: transfer.transferId,
        });
    } catch (error) {
        console.error("Error processing transfer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
