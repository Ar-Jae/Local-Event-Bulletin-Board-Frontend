import { useState, useEffect } from 'react';
import '/src/assets/Events.css';
import EventCard from '../components/EventCard';
import LogOut from '../auth/LogOut'

const fakeEvents = [
  {
    _id: 'fake-1',
    Title: 'Community Potluck',
    Description: 'Join us for a neighborhood potluck! Bring your favorite dish to share.',
    Location: 'Community Center Park',
    Date: new Date().toISOString(),
    Time: '18:00',
    Category: 'Social',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=60'
  },
  {
    _id: 'fake-2',
    Title: 'Morning Yoga',
    Description: 'Start your day with a relaxing yoga session suitable for all levels.',
    Location: 'Town Hall Gym',
    Date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    Time: '08:00',
    Category: 'Health',
    image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&w=800&q=60'
  },
  {
    _id: 'fake-3',
    Title: 'Farmers Market',
    Description: 'Fresh produce, handmade crafts, and local goods every Saturday.',
    Location: 'Main Street Square',
    Date: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    Time: '09:00',
    Category: 'Market',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=60'
  }
];


export default function Events({ sessionToken, isAdmin }) {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = () => {
    const url = "http://127.0.0.1:4000/api/events/events";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEvents([...data, ...fakeEvents]);
        } else {
          setEvents(fakeEvents);
        }
      })
      .catch(err => {
        console.error(err);
        setEvents(fakeEvents);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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

