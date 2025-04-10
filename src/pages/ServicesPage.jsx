import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const eventId = location.state?.eventId;
  const eventTitle = location.state?.eventTitle;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        let response;

        if (eventId) {
          response = await axios.get(`http://localhost:5000/api/events/${eventId}/services`);
        } else {
          response = await axios.get("http://localhost:5000/api/services");
        }

        setServices(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services.");
        setLoading(false);
      }
    };

    fetchServices();
  }, [eventId]);

  if (loading) return <div className="text-center text-xl">Loading services...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="font-sans bg-gray-50 text-gray-800 min-h-screen">
      <Navbar />
      <div className="p-10 pt-24 text-center">
        <h2 className="text-4xl font-bold">
          {eventTitle ? `${eventTitle} Services` : "All Services"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {services.map((service) => (
            <motion.div
              key={service._id}
              className="p-6 border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <Link to={`/services/${service._id}`} state={{ serviceType: service.title }}>
                <img src={service.image} alt={service.title} className="rounded-lg w-full h-40 object-cover" />
                <h3 className="text-xl font-semibold mt-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <p className="text-pink-500 font-semibold mt-2">${service.price}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
