import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Input } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import '@/assets/NavBar.css';
import About from '../pages/About';
import Contact from '../pages/Contact';
import AddEvents from '@/eventControl/CreateEvent';
import ShowEvents from '@/eventControl/ScheduledEvents';



export default function NavBar({ searchTerm, setSearchTerm  }) {

  const [sessionToken, setSessionToken] = useState(undefined)
    console.log("Value of our session token", sessionToken)
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"))
    }
  },[])
  
  return (
    <header className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          🪴 Friendly Fence 🪴
        </a>

        <nav className="navbar-links">
          <a href="/addevents" className="navbar-link">Add Events</a>
          <a href="./about" className="navbar-link">About</a>
          <a href="/contact" className="navbar-link">Contact</a>
          <a href="/admin" className="navbar-link">Admin Login</a>
          <div className="navbar-search">
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        </nav>
      </div>

      <Router>
        <Routes>
          <Route path="/About" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/addevents" element={<AddEvents sessionToken={sessionToken} />} />
        </Routes>
      </Router>
    </header>
  );
}
