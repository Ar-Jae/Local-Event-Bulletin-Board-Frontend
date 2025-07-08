import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Auth from './auth-admin/Auth';
import AdminAuth from './auth-admin/AdminAuth';
import Events from './eventControl/ScheduledEvents';
import Navigation from './components/NavBar';
import Footer from './components/Footer';
import BackDrop from './components/BackDrop';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/PrivacyPolicy';
import Terms from './pages/TermsOfService';
import Report from './pages/ReportPost';
import AddEvents from './eventControl/CreateEvent';

function App() {
  const [sessionToken, setSessionToken] = useState(undefined);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateLocalStorage = newToken => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  return (
    <Router>
      <Navigation />
      <BackDrop />
      <Routes>
        <Route path="/" element={<Auth updateLocalStorage={updateLocalStorage} />} />
        <Route path="/admin" element={<AdminAuth updateLocalStorage={updateLocalStorage} />} />
        <Route path="/events" element={<Events sessionToken={sessionToken} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/report" element={<Report sessionToken={sessionToken} />} />
        <Route path="/addevents" element={<AddEvents sessionToken={sessionToken} />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
