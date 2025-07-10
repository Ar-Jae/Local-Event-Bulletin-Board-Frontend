import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Auth from './auth-admin/User/Auth';
import AdminAuth from './auth-admin/Admin/AdminAuth';
import Events from './eventControl/ScheduledEvents';
import Navigation from './components/NavBar';
import Footer from './components/Footer';
import BackDrop from './components/BackDrop';
import About from './pages/User/About';
import Contact from './pages/User/Contact';
import Privacy from './pages/User/PrivacyPolicy';
import Terms from './pages/User/TermsOfService';
import Report from './pages/User/ReportPost';
import AddEvents from './eventControl/CreateEvent';
import SentReports from './pages/AdminDashboard/ReportCard'; // If you want admin to see reports
import LogOut from './auth-admin/LogOut'; // Import LogOut component
import RSVPPage from './eventControl/RSVPEvent'; // Import the RSVP page
import Dashboard from './pages/AdminDashboard/ Dashboard'; // Import Dashboard component
import ReportCard from './pages/AdminDashboard/ReportCard'; // Import ReportCard component


function App() {
  const [sessionToken, setSessionToken] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") === 'true';
    console.log("Token from localStorage:", token); // Debugging token retrieval
    if (token) {
      setSessionToken(token);
      setIsAdmin(isAdmin);
    }
  }, []);

  const updateLocalStorage = (token, isAdmin) => {
    console.log("Updating localStorage with token:", token); // Debugging token update
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', isAdmin);
    setSessionToken(token);
    setIsAdmin(isAdmin === 'true' || isAdmin === true);
  };

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

        {/* Admin-only routes */}
        <Route path="/admin/dashboard" element={isAdmin ? <Dashboard sessionToken={sessionToken} /> : <div>Unauthorized</div>} />
        <Route path="/admin/reports" element={isAdmin ? <SentReports sessionToken={sessionToken} /> : <div>Unauthorized</div>}/>

        {/* Other routes */}
        <Route path="/rsvp/:eventId" element={<RSVPPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/report" element={<Report sessionToken={sessionToken} />} />
        <Route path="/addevents" element={<AddEvents sessionToken={sessionToken} />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/reports" element={<ReportCard sessionToken={sessionToken} />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

