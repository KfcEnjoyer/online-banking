const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      password: hash,
    });
    res.json("SUCCESS");
  });
});