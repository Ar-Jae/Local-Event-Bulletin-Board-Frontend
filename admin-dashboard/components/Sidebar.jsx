import React from 'react'
import { Link } from 'react-router-dom';
import '../assets/Admin.css';
import LogOut from '/src/auth/LogOut';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <nav aria-label="Sidebar navigation">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/reports">Reports</Link>
        <Link to="/admin/events">Events</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/contact">Contacts</Link>
      </nav>
      <div className="sidebar-footer">
        <LogOut />
      </div>
    </aside>
  )
}






