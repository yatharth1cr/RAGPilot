const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

// Signup route post request
router.post("/signup", (req, res) => {
  const { email, password, role } = req.body;
  console.log("Received signup request:", req.body);

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      const newUser = new User({ email, password, role });
      console.log("Creating new user:", newUser);
      newUser.password = bcrypt.hashSync(password, 10);

      newUser
        .save()
        .then(() => {
          res.status(201).json({ message: "Signup successful" });
        })
        .catch((err) => {
          console.error("Error saving user:", err);
          res.status(500).json({ message: "Server error" });
        });
    }
  });
});

// Login route post request
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Store user information in session
      req.session.user = {
        id: user._id,
        email: user.email,
        role: user.role, // Default to 'user' if role is not set
      };
      res
        .status(200)
        .json({ message: "Login successful", user: req.session.user });
    })
    .catch((error) => {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    });
});

// Logout route post request
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;
