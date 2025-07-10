import React from 'react';
import Admin from '@/pages/AdminDashboard/Admin';
import SentReports from '@/pages/AdminDashboard/ReportCard';


export default function Dashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard. Here you can manage users and view reports.</p>
      <Admin />
      <h2>Sent Reports</h2>
      <SentReports />
    </div>
  );
}
