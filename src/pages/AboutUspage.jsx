import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const AboutUs = () => {
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
      

      {/* Content */}
      <div className="p-10 mt-20 text-center">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <motion.p 
          className="text-lg text-gray-600 max-w-3xl mx-auto" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}>
          WePlan is dedicated to making event planning seamless and stress-free. Our mission is to provide an intuitive platform where users can find, organize, and manage events effortlessly.
        </motion.p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Our Vision", desc: "To revolutionize event management with innovative technology." },
            { title: "Our Mission", desc: "To empower users with seamless planning tools." },
            { title: "Our Values", desc: "Integrity, innovation, and excellence." }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 shadow-lg rounded-lg" 
              whileHover={{ scale: 1.05 }}>
              <h2 className="text-2xl font-semibold text-pink-500 mb-2">{item.title}</h2>
              <p className="text-gray-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
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

export default AboutUs;
