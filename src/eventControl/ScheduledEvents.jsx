import { useState, useEffect } from 'react';
import '@/assets/Events.css';
import EventCard from '../components/EventCard';
import LogOut from '../auth/LogOut'




export default function Events({ sessionToken, isAdmin }) {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

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

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await fetch(`http://127.0.0.1:4000/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': sessionToken
        }
      });
      setEvents(events.filter(e => e._id !== eventId));
    } catch (err) {
      // Handle error
    }
  };

  return (
    <>
      {editingEvent ? (
        <EditEvent
          sessionToken={sessionToken}
          event={editingEvent}
          onCancel={() => setEditingEvent(null)}
          onUpdate={() => {
            setEditingEvent(null);
            fetchEvents();
          }}
        />
      ) : (
        <EventCard
          events={events}
          isAdmin={isAdmin}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      <LogOut />
    </>
  );
}

