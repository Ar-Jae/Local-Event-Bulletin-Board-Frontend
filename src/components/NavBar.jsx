import { Link } from 'react-router-dom';
import { Input } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import '@/assets/NavBar.css';


export default function NavBar() {

  const [sessionToken, setSessionToken] = useState(undefined)

  const [searchTerm, setSearchTerm] = useState("");
  
    console.log("Value of our session token", sessionToken)
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"))
    }
  },[])
  
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/events" className="navbar-logo">
          🪴Friendly Fence🪴
        </Link>

        <nav className="navbar-links">
          <Link to="/addevents" className="navbar-link">Add Events</Link>
          <Link to="/about" className="navbar-link">About</Link>
          <Link to="/contact" className="navbar-link">Contact</Link>
          <Link to="/admin/dashboard" className="navbar-link">Admin Dashboard</Link>
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
