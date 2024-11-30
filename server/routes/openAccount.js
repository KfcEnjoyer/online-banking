const express = require("express");
const router = express.Router();
const { users } = require("../models");
const authenticatedUser = require("../middlewares/AuthMiddlewares"); // Import your middleware

// GET /openaccount route
router.get("/", authenticatedUser, async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from JWT via middleware
        console.log(userId);

        // Fetch the user from the database
        const user = await users.findOne({ where: { id: userId } });
        if (!user) {
            console.log("No user with id " + userId);
            return res.status(404).json({ error: "User does not exist" });
        }

        const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
        };

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Failed to fetch user details" });
    }
});

module.exports = router;
