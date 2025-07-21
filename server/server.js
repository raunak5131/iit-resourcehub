const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
const userRoutes = require("./routes/user.routes");
const eventRoutes = require("./routes/event.routes"); // ✅ ADD this line
const resourceRoutes = require("./routes/resource.routes");
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes); // ✅ ADD this line
app.use("/api/resources", resourceRoutes);
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully.");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
