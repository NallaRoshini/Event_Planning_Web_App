import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ServiceDetails = () => {
  const location = useLocation();
  const { serviceType } = location.state || {};
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [locations, setLocations] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchVendors = async () => {
      if (!serviceType) return;
  
      setLoading(true);  // Start loading
      setError(null);    // Reset error
  
      try {
        console.log(`Fetching vendors for serviceType: "${serviceType}"`);
  
        const response = await fetch(
          `http://localhost:5000/api/vendors?serviceType=${serviceType}`
        );
        const data = await response.json();
  
        console.log("Vendors fetched:", data.length, "results");
  
        if (Array.isArray(data) && data.length > 0) {
          setVendors(data);
          setFilteredVendors(data);

          // Extract unique locations from vendors
          const uniqueLocations = [...new Set(data.map(vendor => vendor.location))];
          setLocations(uniqueLocations);
        } else {
          setVendors([]);
          setFilteredVendors([]);
        }
      } catch (error) {
        console.error("Error fetching vendors:", error);
        setError("Failed to fetch vendors. Please try again.");
      } finally {
        setLoading(false);  // ✅ Ensure loading state is updated
      }
    };
  
    fetchVendors();
  }, [serviceType]);

  // Filter vendors when location changes
  useEffect(() => {
    if (locationFilter) {
      setFilteredVendors(vendors.filter(vendor => vendor.location === locationFilter));
    } else {
      setFilteredVendors(vendors);
    }
  }, [locationFilter, vendors]);
  
  useEffect(() => {
    console.log("Updated vendors state:", vendors);
  }, [vendors]);
  
  useEffect(() => {
    console.log("Loading status changed:", loading);
  }, [loading]);
  

  if (loading) return <div className="text-center text-xl">Loading vendors...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="font-sans bg-gray-50 text-gray-800 min-h-screen">
      <Navbar />
      <div className="p-10 pt-24 text-center">
        <h2 className="text-4xl font-bold">{serviceType} Vendors</h2>
          {/* Location Dropdown Filter */}
        {locations.length > 0 && (
          <div className="mt-4">
            <label className="text-lg font-semibold mr-2">Filter by Location:</label>
            <select
              className="px-4 py-2 border rounded-md"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        )}

        {filteredVendors.length === 0 ? (
          <p className="text-gray-600 mt-4">No vendors found for this service and location.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredVendors.map((vendor) => (
              <motion.div
                key={vendor._id}
                className="p-6 border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold">{vendor.name}</h3>
                <p className="text-gray-600">{vendor.location}</p>
                <p className="text-gray-600">{vendor.rating}</p>
                <p className="text-pink-500 font-semibold mt-2">{vendor.contact}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetails;
