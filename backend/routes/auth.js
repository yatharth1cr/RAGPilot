const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// --------------- Signup Route ---------------
router.post("/signup", (req, res) => {
  const { email, password, role } = req.body;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      // Hash the password
      return bcrypt.hash(password, 10);
    })

    .then((hashedPassword) => {
      const newUser = new User({
        email,
        password: hashedPassword,
        role,
      });

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

// --------------- Login Route ---------------
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const isPasswordValid = bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        JWT_SECRET
      );

      console.log("User logged in:", user.email);
      res.status(200).json({
        message: "Login successful",
        user: {
          email: user.email,
          role: user.role,
          token,
        },
      });
    })

    .catch((err) => {
      console.error("Login error:", err);
      res.status(500).json({ message: "Server error" });
    });
});

// ------------------------ Logout Route------------------------
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

// Get current user
router.get("/me", (req, res) => {
  if (req.session.user) return res.json(req.session.user);
  res.status(401).json({ message: "Not logged in" });
});

module.exports = router;
