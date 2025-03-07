const express = require("express");
const router = express.Router();
const { users } = require("../models");

router.get("/users", async (req, res) => {
    try {
        const allUsers = await users.findAll();

        res.status(200).json(allUsers);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

module.exports = router;
