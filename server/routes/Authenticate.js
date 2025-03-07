const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

const secret_key = "importantSecret";

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const existingUser = await users.findOne({ where: { email: email } });
    if (!existingUser) {
      return res.status(400).json({ error: "User not found" });
    }

    const checkPassword = await bcrypt.compare(password, existingUser.password);
    if (!checkPassword) {
      console.log("lll");
      return res.status(400).json({ error: "Incorrect password" });
    }

    const payload = {
      id: existingUser.id,
      email: existingUser.email,
    };

    const token = sign(payload, secret_key, { expiresIn: "1h" });
    console.log(token);

    res.status(200).json({ message: "Login successful", token: token, user: existingUser });
  } catch (e) {
    console.error("Error during login:", e);
    res.status(400).json({ error: "Login failed", details: e.message });
  }
});

module.exports = router;
