const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  program: { type: String, required: true },
  year: { type: String },
  branch: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  fileURL: { type: String },       // optional: for uploaded file preview
  link: { type: String },          // optional: Google Drive or external link
  uploadedAt: { type: Date, default: Date.now }
});

const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;
