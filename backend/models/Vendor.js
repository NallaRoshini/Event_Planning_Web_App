const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    serviceType: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true, index: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String, trim: true },
        rating: { type: Number, min: 0, max: 5 },
      },
    ],
    contact: { type: String, required: true, trim: true },
  },{ timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);

