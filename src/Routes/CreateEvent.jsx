import { useState } from 'react';
import { Field, Input } from "@chakra-ui/react"


export default function CreateEvent({ sessionToken }) {
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Location, setLocation] = useState('');
  const [DateInput, setDateInput] = useState('');
  const [TimeInput, setTimeInput] = useState('');
  const [Category, setCategory] = useState('');





  const handleAddEvent = async (e) => {
    e.preventDefault();

    const dateTimeString = `${DateInput}T${TimeInput}`;
    // Create a Date object from the date and time inputs
    const date = new Date(dateTimeString);
    // Validate date and time input

    const body = { 
        Title, 
        Description, 
        Location, 
        date: date.toISOString(), // Convert to ISO string for consistency
        time: date.toTimeString().split(' ')[0], // Extract time in HH:MM:SS format      
        Category 
    };

    const url = "http://127.0.0.1:4000/events/event";

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "authorization": sessionToken
        }
      });

      const data = await res.json();
      console.log("Event created:", data);

      // Clear inputs
      setTitle('');
      setDescription('');
      setLocation('');
      setDateInput('');
      setTimeInput('');
      setCategory('');

    } catch (err) {
      console.error("Event creation failed:", err);
    }
  };

  return (
    <>
      <h2>Add New Event</h2>
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
      <textarea
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
        <option value="Yoga Class">Yoga Class</option>
      </select>
      
      <button onClick={handleAddEvent}>ADD EVENT</button>
      </Field.Root>
    </>
  );
}
