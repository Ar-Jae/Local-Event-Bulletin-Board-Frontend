import { useState } from 'react';
import { Field, Input } from "@chakra-ui/react"

export default function UpdateEvent({ event, sessionToken }) {
  console.log("UpdateEvent component rendered" + event);

  // Initialize state with the event's current values
  const [Title, setTitle] = useState(event.Title || '');
  const [Description, setDescription] = useState(event.Description || '');
  const [Location, setLocation] = useState(event.Location || '');
  const [DateInput, setDateInput] = useState(event.Date || '');
  const [TimeInput, setTimeInput] = useState(event.Time || '');
  const [Category, setCategory] = useState(event.Category || '');


  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    const dateTimeString = `${DateInput}T${TimeInput}`;
    // Create a Date object from the date and time inputs
    const date = new Date(dateTimeString);
    // Validate date and time input


    const url = `http://127.0.0.1:4000/api/events/${event._id}`; // Use the event's ID from props
    // Assuming you want to update an event with a specific ID
    
    
    const body = { 
        Title, 
        Description, 
        Location, 
        date: date.toISOString(), // Convert to ISO string for consistency
        time: date.toTimeString().split(' ')[0], // Extract time in HH:MM:SS format      
        Category 
    };

    try {
      const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "authorization": sessionToken
        }
      });

      const data = await res.json();
      console.log("Event updated:", data);

      // Clear inputs
      setTitle('');
      setDescription('');
      setLocation('');
      setDateInput('');
      setTimeInput('');
      setCategory('');

    } catch (err) {
      console.error("Event update failed:", err);
    }
  };

  return (
    <>
     <form onSubmit={handleUpdateEvent}>
     <h2>Update Event</h2>
      <Field.Root required>
      <Field.Label>
      Event <Field.RequiredIndicator />
      </Field.Label>
      <Input
        type="text"
        value={Title}
        name="Title"
        id="Title"
        placeholder="Enter event name"
        onChange={e => setTitle(e.target.value)}
      />
      <Field.Label>
      Description <Field.RequiredIndicator />
      </Field.Label>
      <Input
        type="text"
        value={Description}
        name="Description"
        id="Description"
        placeholder="Enter event description"
        onChange={e => setDescription(e.target.value)}
      />
      <Field.Label>
      Location <Field.RequiredIndicator />
      </Field.Label>
      <Input
        type="text"
        value={Location}
        name="Location"
        id="Location"
        placeholder="Enter event location"
        autoComplete="street-address"
        onChange={e => setLocation(e.target.value)}
      />
      <Field.Label>
      Date <Field.RequiredIndicator />
      </Field.Label>
      <input
        type="date"
        value={DateInput}
        name="DateInput"
        id="DateInput"
        onChange={e => setDateInput(e.target.value)}
      />
      <Field.Label>
      Time <Field.RequiredIndicator />
      </Field.Label>
      <input
        type="time"
        value={TimeInput}
        name="TimeInput"
        id="TimeInput"
        onChange={e => setTimeInput(e.target.value)}
      />
      <Field.Label>
      Category <Field.RequiredIndicator />
      </Field.Label>
      <select
        value={Category}
        onChange={e => setCategory(e.target.value)}
        name="Category"
        id="Category"
      >
        <option value="">Select Category</option>
        <option value="Art Show">Art Show</option>
        <option value="Block Party">Block Party</option>
        <option value="Book Club">Book Club</option>
        <option value="Clean-Up Drive">Clean-Up Drive</option>
        <option value="Community BBQ">Community BBQ</option>
        <option value="Cultural Festival">Cultural Festival</option>
        <option value="Fitness Class">Fitness Class</option>
        <option value="Fundraiser">Fundraiser</option>
        <option value="Kids Activity">Kids Activity</option>
        <option value="Movie Night">Movie Night</option>
        <option value="Open Mic">Open Mic</option>
        <option value="Town Hall">Town Hall</option>
        <option value="Workshop">Workshop</option>
        <option value="Yard Sale">Yard Sale</option>
        <option value="Yoga Class">Yoga Clas</option>
      </select>
      
      <button onClick={handleUpdateEvent}>UPDATE EVENT</button>
      </Field.Root>
    </form>
    </>
  );
}
