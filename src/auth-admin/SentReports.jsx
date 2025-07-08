import '@/assets/SentReports.css';
import React from 'react'
import { useState, useEffect } from 'react';

export default function EventReports(sessionToken) {

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
      
      </>
    );
  }
