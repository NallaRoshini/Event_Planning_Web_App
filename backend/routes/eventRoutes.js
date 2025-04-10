const express = require("express");
const Event = require("../models/Event");
const mongoose = require("mongoose");

const router = express.Router();

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/:id/services", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("services");
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json(event.services);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
