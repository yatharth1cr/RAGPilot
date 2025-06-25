const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const MongoStore = require("connect-mongo");

const connectDB = require("./middlewares/db");
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Authentication API");
});

app.use("/auth", authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
