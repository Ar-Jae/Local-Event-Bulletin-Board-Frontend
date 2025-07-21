import React from 'react';
import WelcomeMessage from '../components/WelcomeMessage';
import LogOut from '@/auth/LogOut';

import '../assets/Admin.css'; // Assuming you have a CSS file for styling



export default function AdminPage() {
  return (
    <>
    <WelcomeMessage />
    <div className="app">
      <button>
      <a href="/admin/users" style={{ textDecoration: 'none', color: 'inherit' }}>
        Manage Users
      </a>
    </button>
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
      <a href="/admin/events" style={{ textDecoration: 'none', color: 'inherit' }}>
        Manage Events
      </a>
      </button>
    </div>
    <LogOut />
    </>
    
  );
}

