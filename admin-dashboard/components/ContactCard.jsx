import React from 'react'
import { useState, useEffect } from 'react';
import { Box } from "@chakra-ui/react";
import '../assets/ContactCard.css';


export default function ContactCard({ sessionToken }) {

    const [ContactCards, setContactCards] = useState([]);
    
    const fetchReport = () => {
      const url = "http://127.0.0.1:4000/api/contact/contacts";
  
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": sessionToken
        }
      })
        .then(res => res.json())
        .then(data => setContactCards(data))
        .catch(err => console.error(err));
    };
  
    useEffect(() => {
      fetchReport(sessionToken);
    }, []);
  
    return (
      <Box position="sticky" top="0" zIndex="sticky" py={4} px={6}>
        <div className="contact-card-grid">
          {ContactCards.map((contact) => (
            <div className="contact-card" key={contact._id}>
              <h3 className="card-title">{contact.name}</h3>

              <div className="card-detail">{contact.message}</div>
              <div className="card-meta">Reported by: {contact.email}</div>
            </div>
          ))}
        </div>
      </Box>
    );
  }
// This code defines a React component called ReportCard that fetches and displays reported posts.
// It uses Chakra UI components for styling and layout.