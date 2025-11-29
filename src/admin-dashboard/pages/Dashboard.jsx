import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import WelcomeMessage from '../components/WelcomeMessage.jsx';
import LogOut from '../../auth/LogOut.jsx';


import '../assets/Admin.css';

export default function AdminPage() {


  useEffect(() => {
    // Fetch pending admin requests from backend
    fetch('http://127.0.0.1:4000/api/adminUser/pending')
      .then(res => res.json())
      // .then(data => (data)) // No-op removed
      .catch(err => console.error('Failed to fetch requests:', err));
  }, []);

  return (
    <>
        <div className="button-grid">
          <button>
            <Link to="/admin/reports" style={{ textDecoration: 'none', color: 'inherit' }}>
              View Reports
            </Link>
          </button>
          <button>
            <Link to="/admin/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
              Contact Us
            </Link>
          </button>
          <button>
            <Link to="/admin/users" style={{ textDecoration: 'none', color: 'inherit' }}>
              Manage Users
            </Link>
          </button>
          <button>
            <Link to="/admin/events" style={{ textDecoration: 'none', color: 'inherit' }}>
              Manage Events
            </Link>
          </button>
          <button>
            <Link to="/admin/requests" style={{ textDecoration: 'none', color: 'inherit' }}>
              Manage Requests
            </Link>
          </button>
        </div>
     
      <LogOut />
    </>
  );
}