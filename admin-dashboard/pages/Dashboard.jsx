import React, { useEffect } from 'react';
import WelcomeMessage from '/admin-dashboard/components/WelcomeMessage.jsx';
import LogOut from '/src/auth/LogOut.jsx';


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
      <WelcomeMessage />
        <div className="button-grid">
          <button>
            <a href="/admin/reports" style={{ textDecoration: 'none', color: 'inherit' }}>
              View Reports
            </a>
          </button>
          <button>
            <a href="/admin/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
              Contact Us
            </a>
          </button>
          <button>
            <a href="/admin/users" style={{ textDecoration: 'none', color: 'inherit' }}>
              Manage Users
            </a>
          </button>
          <button>
            <a href="/admin/events" style={{ textDecoration: 'none', color: 'inherit' }}>
              Manage Events
            </a>
          </button>
          <button>
            <a href="/admin/requests" style={{ textDecoration: 'none', color: 'inherit' }}>
              Manage Requests
            </a>
          </button>
        </div>
     
      <LogOut />
    </>
  );
}