import '@/assets/SentReports.css';
import React from 'react'
import { useState, useEffect } from 'react';

export default function ReportCard({ sessionToken }) {

    const [reportedPosts, setReportedPosts] = useState([]);
    
    const fetchEvents = () => {
      const url = "http://127.0.0.1:4000/api/reportedPost/reports";
  
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": sessionToken
        }
      })
        .then(res => res.json())
        .then(data => setReportedPosts(data))
        .catch(err => console.error(err));
    };
  
    useEffect(() => {
      fetchEvents();
    }, []);
  
    return (
      <>
      <p className="intro-text">
        Here you can view all reported posts. Please review them and take appropriate action.
      </p>
      <p className="note-text">
        Note: This is an admin-only section. Ensure you handle reports responsibly.
      </p>
      <button onClick={fetchEvents}>Refresh Reports</button>
      {reportedPosts.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <ul className="reports-list">
          {reportedPosts.map((report, idx) => (
            <li key={report.id || idx} className="report-item">
              <strong>Post: {report.post || "Untitled"}</strong>
              <div><b>Reason:</b> {report.reason || "No reason provided"}</div>
              {report.reportedBy && (
                <div><b>Reported By:</b> {report.reportedBy}</div>
              )}
              {report.date && (
                <div><b>Date:</b> {new Date(report.date).toLocaleString()}</div>
              )}
              {report.details && (
                <div><b>Details:</b> {report.details}</div>
              )}
            </li>
          ))}
        </ul>
      )}
      </>
    );
  }
