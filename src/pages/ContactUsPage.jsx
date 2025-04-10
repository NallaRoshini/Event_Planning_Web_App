import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API request)
    alert("Form submitted!");
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-5 bg-white shadow-md fixed top-0 w-full z-10">
        <div className="flex items-center gap-10">
          <h1 className="text-3xl font-extrabold text-pink-500">WePlan</h1>
          <ul className="flex gap-8 text-lg font-medium">
            {['Home', 'Events', 'Services', 'About Us', 'Contact Us'].map((item) => {
              const path = `/${item.toLowerCase().replace(" ", "-")}`;
              return (
                <li key={item} className={`hover:text-pink-500 cursor-pointer ${location.pathname === path ? "text-pink-500 font-bold" : ""}`}>
                  <Link to={path}>{item}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <button className="bg-pink-500 text-white px-5 py-2 rounded-md hover:bg-pink-600">Login/Register</button>
      </nav>

      {/* Contact Form */}
      <div className="p-10 mt-20 text-center">
        <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
        <motion.p 
          className="text-lg text-gray-600 max-w-3xl mx-auto mb-6" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}>
          We would love to hear from you! Please fill out the form below to reach out.
        </motion.p>

        <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <div className="mb-4">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="6"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <button type="submit" className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600">
            Submit
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="p-6 bg-gray-800 text-white flex justify-between items-center mt-10">
        <p>&copy; 2025 WePlan</p>
        <div className="flex gap-4">
          <FaFacebook className="cursor-pointer hover:text-pink-500" />
          <FaInstagram className="cursor-pointer hover:text-pink-500" />
          <FaTwitter className="cursor-pointer hover:text-pink-500" />
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
