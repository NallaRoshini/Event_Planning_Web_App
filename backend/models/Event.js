const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    organizer: { type: String, required: true, trim: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    // services: [{ type: String, required: false }]  // New field for services
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
