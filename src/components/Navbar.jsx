import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-5 bg-white shadow-md fixed w-full z-10">
      <div className="flex items-center gap-10">
        <h1 className="text-3xl font-extrabold text-pink-500">WePlan</h1>
        <ul className="flex gap-8 text-lg font-medium">
          {["Home", "Events", "Services", "About Us", "Contact Us"].map((item) => (
            <li key={item} className={`hover:text-pink-500 cursor-pointer "text-pink-500 font-bold" : ""}`}>
              <Link to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}>{item}</Link>
            </li>
          ))}
        </ul>
      </div>
      <button className="bg-pink-500 text-white px-5 py-2 rounded-md hover:bg-pink-600">Login/Register</button>
    </nav>
  );
};

export default Navbar;
