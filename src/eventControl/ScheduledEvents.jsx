import { useState, useEffect } from 'react';
import '@/assets/Events.css';
import EventCard from '../components/EventCard';
import LogOut from '../auth-admin/LogOut'




export default function Events({ sessionToken }) {

  const [events, setEvents] = useState([]);
  

  const fetchEvents = () => {
    const url = "http://127.0.0.1:4000/api/events/events";

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": sessionToken
      }
    })
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (sessionToken) fetchEvents();
  }, [sessionToken]);

  return (
    <>
    <EventCard events={events} />
    <LogOut />

    </>
  );
}

