import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/send-otp', { email });
      if (response.data.success) {
        alert("OTP sent to your email.");
        setIsOtpSent(true);
      }
    } catch (error) {
      alert("Error sending OTP. Try again.");
      console.error('Error sending OTP:', error);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/verify-otp', { email, otp, name, phone });
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        alert("Login successful!");
        navigate('/');
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      alert("Error verifying OTP.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div className="bg-white p-8 rounded-lg shadow-lg w-96"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-center text-pink-500">Login / Register</h2>
        <div className="mt-4">
          <input type="text" placeholder="Name" className="w-full p-2 border rounded mt-2" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded mt-2" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="tel" placeholder="Phone Number" className="w-full p-2 border rounded mt-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
          {isOtpSent && <input type="text" placeholder="Enter OTP" className="w-full p-2 border rounded mt-2" value={otp} onChange={(e) => setOtp(e.target.value)} />}
          <button className="w-full bg-pink-500 text-white p-2 rounded mt-4 hover:bg-pink-600" onClick={isOtpSent ? verifyOtp : sendOtp}>
            {isOtpSent ? 'Verify OTP' : 'Send OTP'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;