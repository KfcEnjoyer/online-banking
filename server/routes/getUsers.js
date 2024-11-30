const express = require("express");
const router = express.Router();
const { users } = require("../models"); // Assuming users is a Sequelize model or similar ORM

// GET /users route
router.get("/users", async (req, res) => {
    try {
        // Fetch all users from the database
        const allUsers = await users.findAll(); // Adjust the method according to your ORM

        // Send the users as a response
        res.status(200).json(allUsers);
    } catch (error) {
        // Handle any errors
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

module.exports = router;
