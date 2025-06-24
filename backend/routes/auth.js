const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

// POST /auth/signup
router.post("/signup", (req, res) => {
  const { email, password, role } = req.body;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = new User({ email, password: hashedPassword, role });
      return newUser.save();
    })
    .then((savedUser) => {
      if (savedUser) {
        res.status(201).json({ message: "Signup successful" });
      }
    })
    .catch((err) => {
      console.error("Signup error:", err);
      res.status(500).json({ message: "Server error" });
    });
});

// POST /auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      req.session.user = {
        id: user._id,
        email: user.email,
        role: user.role,
      };
      res
        .status(200)
        .json({ message: "Login successful", user: req.session.user });
    })
    .catch((err) => {
      console.error("Login error:", err);
      res.status(500).json({ message: "Server error" });
    });
});

// POST /auth/logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

// GET /auth/me
router.get("/me", (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  }
  res.status(401).json({ message: "Not logged in" });
});

module.exports = router;
