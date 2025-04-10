import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="p-6 bg-gray-800 text-white flex justify-between items-center mt-10">
      <p>&copy; 2025 WePlan</p>
      <div className="flex gap-4">
        <a href="#" aria-label="Facebook">
          <FaFacebook className="cursor-pointer hover:text-pink-500" />
        </a>
        <a href="#" aria-label="Instagram">
          <FaInstagram className="cursor-pointer hover:text-pink-500" />
        </a>
        <a href="#" aria-label="Twitter">
          <FaTwitter className="cursor-pointer hover:text-pink-500" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
