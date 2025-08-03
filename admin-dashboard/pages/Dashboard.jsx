import React, { useEffect } from 'react';
import WelcomeMessage from '/admin-dashboard/components/WelcomeMessage.jsx';
import LogOut from '/src/auth/LogOut.jsx';


import '../assets/Admin.css';

export default function AdminPage() {


  useEffect(() => {
  fetch('http://127.0.0.1:4000/api/adminUser/pending')
    .then(async (res) => {
      if (!res.ok) {
        const text = await res.text();
        console.error('Error response:', res.status, text);
        return;
      }
      return res.json();
    })
    .then((data) => {
      if (data) {
        console.log('Pending admins:', data);
      }
    })
    .catch((err) => {
      console.error('Network error:', err.message);
    });
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