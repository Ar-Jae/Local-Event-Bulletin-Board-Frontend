import { Link } from 'react-router-dom';
import { Input } from "@chakra-ui/react";

import { useState, useEffect } from 'react';
import '@/assets/NavBar.css';


export default function NavBar() {

  const [sessionToken, setSessionToken] = useState(undefined)
  const [userId, setUserId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setSessionToken(token);
    const user = localStorage.getItem("user");
    if (user) {
      try {
        setUserId(JSON.parse(user)._id);
      } catch {
        // Failed to parse user from localStorage
      }
    }
  },[])
  
  return (
    <header className="navbar" role="banner">
      <div className="navbar-container">
        <Link to="/events" className="navbar-logo" aria-label="Home">
          🪴Friendly Fence🪴
        </Link>

        <nav className="navbar-links" role="navigation" aria-label="Main Navigation">
          <Link to="/addevents" className="navbar-link" aria-label="Add Events">Add Events</Link>
          <Link to="/about" className="navbar-link" aria-label="About">About</Link>
          <Link to="/contact" className="navbar-link" aria-label="Contact">Contact</Link>
          <Link to="/admin/dashboard" className="navbar-link" aria-label="Admin Dashboard">Admin Dashboard</Link>
          <div className="navbar-search">
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search events"
              bg="#fff"
              color="#222"
              borderColor="#222"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
