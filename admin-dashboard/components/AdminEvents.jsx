import React from 'react'
import ScheduledEvents from '/src/eventControl/ScheduledEvents';
import EventCard from '@/components/EventCard';

export default function AdminEvents() {
  return (
    <div>
        <h1>Admin Events Dashboard</h1>
        <p>Manage events here.</p>
        {/* Add your event management components here */}
        <p>This section is for administrators to manage events, view statistics, and perform other administrative tasks related to events.</p>
        <ScheduledEvents />
        
     
      
    </div>
  )
}
