const express = require("express");
const router = express.Router();
const Vendor = require("../models/Vendor");

router.get("/", async (req, res) => {
  try {
    let { serviceType, location, page = 1, limit = 5 } = req.query;

    if (!serviceType || serviceType.trim() === "") {
      console.log("Missing serviceType in request");
      return res.status(400).json({ message: "Service type is required" });
    }

    serviceType = serviceType.trim(); // Remove extra spaces
    const query = { serviceType: { $regex: `^${serviceType}$`, $options: "i" } };

    if (location && location.trim() !== "") {
      query.location = location.trim();
    }

    console.log(`Fetching vendors for serviceType: "${serviceType}"`);

    const vendors = await Vendor.find(query)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    if (vendors.length === 0) {
      console.log(`No vendors found for: "${serviceType}"`);
      return res.status(404).json({ message: "No vendors found for this service type." });
    }

    console.log(`Vendors fetched: ${vendors.length} results`);
    res.status(200).json(vendors);
  } catch (err) {
    console.error("Error fetching vendors:", err);
    res.status(500).json({ message: "Something went wrong.", error: err.message });
  }
});

module.exports = router;