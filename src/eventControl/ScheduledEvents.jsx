
import { useState, useEffect } from 'react';
import '@/assets/Events.css';
import EventCard from '../components/EventCard';
import LogOut from '../auth/LogOut';
// ...existing code...




export default function Events({ sessionToken }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initial fetch for all events (optional, can be removed if only using search)
  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("/api/events/events", {
      headers: { "authorization": sessionToken }
    })
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [sessionToken]);

  return (
    <>
      {/* SearchEvent removed due to rendering error */}
      {loading && <div style={{ textAlign: 'center' }}>Loading events...</div>}
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
      <EventCard events={events} sessionToken={sessionToken} />
      <LogOut />
    </>
  );
}

