import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/events")
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      });
  }, []);

  const handleEventClick = (event) => {
    navigate("/services", {
      state: { eventId: event._id, eventTitle: event.title },
    });
  };

  if (loading) return <div className="text-center">Loading Events...</div>;

  return (
    <div className="font-sans bg-gray-50 min-h-screen text-gray-800">
      <Navbar />
      <div className="p-10 pt-24 text-center">
        <h2 className="text-4xl font-bold">Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {events.map((event) => (
            <motion.div
              key={event._id}
              className="p-6 border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleEventClick(event)}
            >
              <img src={event.image} alt={event.title} className="rounded-lg w-full h-40 object-cover" />
              <h3 className="text-xl font-semibold mt-4">{event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;
