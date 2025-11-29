import './App.css';
import Homepage from './components/Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdminAuth from './admin-dashboard/Admin/AdminAuth';
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
import SentReports from './admin-dashboard/components/ReportCard'; // If you want admin to see reports
import LogOut from './auth/LogOut'; // Import LogOut component
import RSVPPage from './eventControl/RSVPEvent'; // Import the RSVP page
import Dashboard from './admin-dashboard/pages/Dashboard'; // Import Dashboard component
import ManageRequests from './admin-dashboard/components/ManageRequests';
import ReportCard from './admin-dashboard/components/ReportCard'; // Import ReportCard component
import ContactCard from './admin-dashboard/components/ContactCard';
import AdminEvents from './admin-dashboard/components/AdminEvents'; // Import AdminEvents component
import Users from './admin-dashboard/components/Users'; // Import Users component
import EditEvent from './eventControl/EditEvent';



function App() {
  const [sessionToken, setSessionToken] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") === 'true';
    if (token) {
      setSessionToken(token);
      setIsAdmin(isAdmin);
    }
  }, []);

  const updateLocalStorage = (token, isAdmin) => {
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
        <Route
          path="/"
          element={<Events sessionToken={sessionToken} />}
        />
        
        {/* User dashboard route */}
        <Route
          path="/events"
          element={<Events sessionToken={sessionToken} />}
        />

        {/* Admin dashboard route */}
        <Route
          path="/admin/dashboard"
          element={
            sessionToken ? (
              <Dashboard sessionToken={sessionToken} />
            ) : (
              <AdminAuth updateLocalStorage={updateLocalStorage} />
            )
          }
        />
        <Route
          path="/admin/requests"
          element={
            isAdmin
              ? <ManageRequests sessionToken={sessionToken} isAdmin={isAdmin} />
              : <div>Unauthorized</div>
          }
        />

        {/* Admin-only routes */}
        <Route
          path="/admin/reports"
          element={
            isAdmin
              ? <SentReports sessionToken={sessionToken} isAdmin={isAdmin} />
              : <div>Unauthorized</div>
          }
        />
        <Route
          path="/admin/contact"
          element={
            isAdmin
              ? <ContactCard sessionToken={sessionToken} isAdmin={isAdmin} />
              : <div>Unauthorized</div>
          }
        />
        <Route
          path="/admin/users"
          element={
            isAdmin
              ? <Users sessionToken={sessionToken} isAdmin={isAdmin} />
              : <div>Unauthorized</div>
          }
        />
        <Route
          path="/admin/events/edit/:eventId"
          element={
            isAdmin
              ? <EditEvent sessionToken={sessionToken} isAdmin={isAdmin} />
              : <div>Unauthorized</div>
          }
        />
        <Route
          path="/admin/events"
          element={
            isAdmin
              ? <AdminEvents sessionToken={sessionToken} isAdmin={isAdmin} />
              : <div>Unauthorized</div>
          }
        />

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
        <Route path="*" element={<Homepage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


