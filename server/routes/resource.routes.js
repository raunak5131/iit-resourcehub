const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Resource = require("../models/resource.model");

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder where files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// @GET all resources
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find().sort({ uploadedAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @POST a new resource (with optional file)
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { program, year, branch, type, title, link } = req.body;

    const newResource = new Resource({
      program,
      year,
      branch,
      type,
      title,
      link,
      fileURL: req.file ? `/uploads/${req.file.filename}` : null
    });

    await newResource.save();
    res.status(201).json(newResource);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @DELETE a resource by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Resource.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Resource not found" });
    res.json({ message: "Resource deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
