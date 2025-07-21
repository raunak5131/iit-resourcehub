const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  bio: String,
  department: String,
  program: String,  // e.g., B.Tech / M.Tech
  year: Number,
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
