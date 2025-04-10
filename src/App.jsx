import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import EventPage from "./pages/EventPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import AboutUspage from "./pages/AboutUspage.jsx";
import ContactUsPage from "./pages/ContactUsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ServiceDetails from "./pages/ServiceDetails.jsx";
import EventDetails from "./pages/EventDetails.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about-us" element={<AboutUspage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
