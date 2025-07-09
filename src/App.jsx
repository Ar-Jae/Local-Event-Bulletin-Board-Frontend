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
import SentReports from './components/ReportCard'; // If you want admin to see reports

function App() {
  const [sessionToken, setSessionToken] = useState(undefined);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); // Debugging token retrieval
    if (token) {
      setSessionToken(token);
    }
  }, []);

  const updateLocalStorage = newToken => {
    console.log("Updating localStorage with token:", newToken); // Debugging token update
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  // Simple role check (replace with real logic as needed)
  const isAdmin = sessionToken && sessionToken.startsWith("admin-");

  return (
    <Router>
      <Navigation />
      <BackDrop />
      <Routes>
        {/* Login routes */}
        <Route path="/" element={<Auth updateLocalStorage={updateLocalStorage} />} />
        <Route path="/admin" element={<AdminAuth updateLocalStorage={updateLocalStorage} />} />

        {/* After login, show events for user and admin */}
        <Route
          path="/events"
          element={
            sessionToken ? (
              <Events sessionToken={sessionToken} />
            ) : (
              <Auth updateLocalStorage={updateLocalStorage} />
            )
          }
        />

        {/* Admin-only: view sent reports */}
        <Route
          path="/admin/reports"
          element={
            isAdmin ? (
              <SentReports sessionToken={sessionToken} />
            ) : (
              <div>Unauthorized</div>
            )
          }
        />

        {/* Other routes */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/report" element={<Report sessionToken={sessionToken} />} />
        <Route path="/addevents" element={<AddEvents sessionToken={sessionToken} />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

