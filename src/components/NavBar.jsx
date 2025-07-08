import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Input } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import '@/assets/NavBar.css';
import About from '../pages/About';
import Contact from '../pages/Contact';
import AddEvents from '@/eventControl/CreateEvent';




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
          <Link to="/addevents" className="navbar-link">Add Events</Link>
          <Link to="/about" className="navbar-link">About</Link>
          <Link to="/contact" className="navbar-link">Contact</Link>
          <Link to="/admin" className="navbar-link">Admin Login</Link>
          <div className="navbar-search">
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        </nav>
      </div>
    </header>
  );
}
