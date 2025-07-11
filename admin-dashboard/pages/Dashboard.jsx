import React from 'react';
import WelcomeMessage from '../components/WelcomeMessage';
import SentReports from '../components/SentReports';
import LogOut from '/src/auth/LogOut';


export default function Dashboard() {
  return (
    <div>
      <WelcomeMessage />
      <SentReports />
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
      <LogOut />
    </div>
  );
}