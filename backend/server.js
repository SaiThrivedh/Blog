const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./models"); // Sequelize models
require("dotenv").config();

const app = express();

// CORS: Allow frontend connection
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true, // allow sending cookies
}));

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
//const profileRoutes = require("./routes/profileRoute");

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);
//app.use("/profile", profileRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await db.sequelize.sync(); // Sync DB
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log("✅ Database synced successfully");
  } catch (err) {
    console.error("❌ Failed to sync DB:", err);
  }
});
