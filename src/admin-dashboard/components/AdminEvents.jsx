import React, { useState, useEffect } from 'react';
import EventCard from '../../components/EventCard.jsx';
import EditEventForm from '../../eventControl/EditEvent.jsx';
import LogOut from '../../auth/LogOut';

export default function AdminEvents({ sessionToken, isAdmin }) {

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // ✅ Fetch events from the API

 
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

  const handleDeleteEvent = async (eventId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    const url = `http://127.0.0.1:4000/api/events/${eventId}`;
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authorization": sessionToken
        }
      });
      if (res.ok) {
        setEvents(events.filter(e => e._id !== eventId));
        alert("Event deleted!");
      } else {
        alert("Failed to delete event.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting event.");
    }
  };

  // ✅ Conditionally render edit form
  if (selectedEvent) {
    return (
      <EditEventForm
        event={selectedEvent}
        sessionToken={sessionToken}
        onCancel={() => setSelectedEvent(null)}
        onUpdate={() => {
          setSelectedEvent(null);
          fetchEvents();
        }}
      />
    );
  }
  
  return (
    <div>
      {!selectedEvent ? (
        <>
          <h1>Admin Events Dashboard</h1>
          {/* Pending Events Section */}
          <h2>Pending Events</h2>
          {events.filter(e => e.status === 'pending').length === 0 ? (
            <p>No pending events.</p>
          ) : (
            events.filter(e => e.status === 'pending').map(event => (
              <Box key={event._id} bg="yellow.100" p={3} mb={2} borderRadius="md">
                <strong>{event.Title}</strong> - {event.Description}
                <Button colorScheme="green" size="sm" ml={2} onClick={async () => {
                  await fetch(`http://127.0.0.1:4000/api/events/approve/${event._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'authorization': sessionToken }
                  });
                  fetchEvents();
                }}>Approve</Button>
                <Button colorScheme="red" size="sm" ml={2} onClick={async () => {
                  await fetch(`http://127.0.0.1:4000/api/events/reject/${event._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'authorization': sessionToken }
                  });
                  fetchEvents();
                }}>Reject</Button>
              </Box>
            ))
          )}
          {/* All Events Section */}
          <h2>All Events</h2>
          <EventCard
            events={events}
            isAdmin={isAdmin}
            onDelete={handleDeleteEvent}
            onEdit={(event) => setSelectedEvent(event)}
          />
          <LogOut />
        </>
      ) : (
        <EditEventForm
          event={selectedEvent}
          sessionToken={sessionToken}
          onCancel={() => setSelectedEvent(null)}
          onUpdate={() => {
            fetchEvents();
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
}
