import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventRes = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(eventRes.data);

        const servicesRes = await axios.get(`http://localhost:5000/api/events/${id}/services`);
        setServices(servicesRes.data);

        setLoading(false);
      } catch (err) {
        setError("Failed to load event details.");
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) return <div className="text-center text-lg">Loading event details...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{event.name}</h1>
      <p className="text-gray-600">📍 {event.location}</p>
      <p className="text-gray-600">📅 {event.date}</p>
      <p className="mt-4">{event.description}</p>

      <h2 className="text-2xl font-bold mt-6">Services</h2>
      {services.length > 0 ? (
        <ul className="list-disc pl-6">
          {services.map((service, index) => (
            <li key={index} className="text-gray-700">{service}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No services available.</p>
      )}
    </div>
  );
};

export default EventDetails;
