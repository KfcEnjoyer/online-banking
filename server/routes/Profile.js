const express = require("express");
const router = express.Router();
const { users } = require("../models");
const authenticatedUser = require("../middlewares/AuthMiddlewares");

router.get("/", authenticatedUser, async (req, res) => {
    try {
        const user = await users.findOne( { where: {id: req.user.id} }); 
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;
