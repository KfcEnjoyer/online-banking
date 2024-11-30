const express = require("express");
const router = express.Router();
const { users } = require("../models"); // Model import assumed to be correct
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

const secret_key = "importantSecret"; // You should use environment variables in production

// Register Route
router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await users.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password
    const cryptedPassword = await bcrypt.hash(password, 12);

    // Create the new user in the database
    const newUser = await users.create({
      email: email,
      password: cryptedPassword,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
    });

    const payload = {
      id: newUser.id,
      email: newUser.email,
    };

    // Generate a JWT token
    const token = sign(payload, secret_key, { expiresIn: "1h" });

    // Send cookie with JWT
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    //   maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    // });

    res.status(200).json({ message: "Successfully registered", user: newUser });
  } catch (e) {
    console.error("Error during registration:", e);
    res.status(400).json({ error: "Registration failed", details: e.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await users.findOne({ where: { email: email } });
    if (!existingUser) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare passwords
    const checkPassword = await bcrypt.compare(password, existingUser.password);
    if (!checkPassword) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const payload = {
      id: existingUser.id,
      email: existingUser.email,
    };

    // Generate a JWT token
    const token = sign(payload, secret_key, { expiresIn: "1h" });
    console.log(token);
    // Send cookie with JW

    res.status(200).json({ message: "Login successful", token: token, user: existingUser });
  } catch (e) {
    console.error("Error during login:", e);
    res.status(400).json({ error: "Login failed", details: e.message });
  }
});

module.exports = router;
