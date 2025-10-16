/**
 * Main server entry point
 */
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const ragRoutes = require("./routes/ragRoutes");

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Configuration
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "default_secret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 24 * 60 * 60 * 1000, // 1 day
//     },
//   })
// );

// Routes
app.get("/", (req, res) => res.send("Welcome to the Authentication & RAG API"));
app.use("/auth", authRoutes);
app.use("/rag", ragRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
