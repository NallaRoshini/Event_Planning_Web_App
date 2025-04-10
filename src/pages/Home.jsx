import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([]);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventRes = await axios.get('http://localhost:5000/api/events');
        setEvents(eventRes.data);
        const serviceRes = await axios.get('http://localhost:5000/api/services');
        setServices(serviceRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();

    // Check for logged-in user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const eventSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const serviceSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const scrollToEvents = () => {
    document.getElementById("upcoming-events").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-5 bg-white shadow-md fixed w-full z-10">
        <div className="flex items-center gap-10">
          <h1 className="text-3xl font-extrabold text-pink-500">WePlan</h1>
          <ul className="flex gap-8 text-lg font-medium">
            {['Home', 'Events', 'Services', 'About Us', 'Contact Us'].map((item) => {
              const path = `/${item.toLowerCase().replace(/\s+/g, "-")}`;
              return (
                <li key={item} className={`hover:text-pink-500 cursor-pointer ${location.pathname === path ? "text-pink-500 font-bold" : ""}`}>
                  <Link to={path}>{item}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="bg-pink-500 text-white px-4 py-2 rounded-full text-lg font-bold">
              {user.name.charAt(0)}
            </span>
            <button onClick={handleLogout} className="text-gray-700 hover:text-red-500">
              Logout
            </button>
          </div>
        ) : (
          <button className="bg-pink-500 text-white px-5 py-2 rounded-md hover:bg-pink-600" onClick={() => navigate('/login')}>
            Login/Register
          </button>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center bg-cover bg-center text-white" style={{ backgroundImage: "url('/event-banner.jpg')" }}>
        <motion.h1 className="text-6xl font-bold text-pink-500" animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -50 }} transition={{ duration: 0.8 }}>
          Plan Your Perfect Event, Effortlessly
        </motion.h1>
        <motion.button className="mt-6 px-8 py-4 bg-pink-500 rounded-md text-white text-lg font-semibold hover:bg-pink-600" whileHover={{ scale: 1.1 }} onClick={scrollToEvents}>
          Explore Events
        </motion.button>
      </section>

      {/* Upcoming Events */}
      <section id="upcoming-events" className="relative p-10 text-center bg-cover bg-center" style={{ backgroundImage: "url('/events-bg.jpg')" }}>
        <h2 className="text-4xl font-bold text-pink-500">Upcoming Events</h2>
        <Slider {...eventSettings} className="mt-8">
          {events.map(event => (
            <div key={event._id} className="p-6 bg-white rounded-lg shadow-lg">
              <img src={event.image} alt={event.name} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-xl font-semibold mt-2">{event.name}</h3>
            </div>
          ))}
        </Slider>
      </section>

      {/* Services Section */}
      <section className="p-10 flex items-center justify-between bg-gray-900 text-white">
        <h2 className="text-4xl font-bold">Explore All Services</h2>
        <div className="w-1/2">
          <Slider {...serviceSettings}>
            {services.map(service => (
              <div key={service._id} className="p-6 bg-white text-gray-800 rounded-lg shadow-lg">
                <img src={service.image} alt={service.name} className="w-full h-40 object-cover rounded-md" />
                <h3 className="text-xl font-semibold mt-2">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 bg-gray-800 text-white flex justify-between items-center">
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

export default Home;
