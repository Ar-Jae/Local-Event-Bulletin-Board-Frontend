import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Input, Box, Card, Flex, Heading, Button, FileUpload, Float, useFileUploadContext } from "@chakra-ui/react"
import { LuFileImage, LuX } from "react-icons/lu"
import '@/assets/CreateEvent.css';

export default function CreateEvent({ sessionToken }) {
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Location, setLocation] = useState('');
  const [DateInput, setDateInput] = useState('');
  const [TimeInput, setTimeInput] = useState('');
  const [Category, setCategory] = useState('');
  const [Image, setImage] = useState(null); // Store File object
  const navigate = useNavigate();

  const handleAddEvent = async (e) => {
    e.preventDefault();

    // Use the selected date and time to create a Date object
    const date = new Date(`${DateInput}T00:00:00Z`);

    const eventData = {
      Title,
      Description,
      Location,
      Date: date.toISOString(), // Full ISO string for MongoDB
      Time: TimeInput.slice(0, 5), // HH:MM
      Category,
      // Image: Image,
      ImageUrl: Image ? URL.createObjectURL(Image) : "https://images.unsplash.com/photo-1667489022797-ab608913feeb?auto=format&fit=crop&w=800&q=60" // Use local URL for preview
    };
  
    const url = "http://127.0.0.1:4000/api/events/event";
  
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": sessionToken   
        },
        body: JSON.stringify(eventData)
      });
  
      const data = await res.json();
      console.log("Event created:", data);
      navigate("/events"); // Redirect after successful creation
    } catch (err) {
      console.error(err);
    }
  };

  const FileUploadList = () => {
    const fileUpload = useFileUploadContext()
    const files = fileUpload.acceptedFiles
    if (files.length === 0) return null
    return (
      <FileUpload.ItemGroup>
        {files.map((file) => (
          <FileUpload.Item
            w="auto"
            boxSize="10"
            p="2"
            file={file}
            key={file.name}
          >
            <FileUpload.ItemPreviewImage />
            <Float placement="top-end">
              <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
                <LuX />
              </FileUpload.ItemDeleteTrigger>
            </Float>
          </FileUpload.Item>
        ))}
      </FileUpload.ItemGroup>
    )
  }

  return (
    <Flex minH="83vh" justify="center" align="center">

     <Card.Root bg="blackAlpha.700"
      rounded="3xl"
      overflow="hidden"
      boxShadow="md"
      transition="all 0.2s"
      _hover={{ boxShadow: "xl", 
      transform: "translateY(-2px)"}}>

     <Box
        position="sticky" top="0" zIndex="sticky" py={4} px={6} bg="#222" color="#fff" aria-label="Create Event Form Section"
      >
      <Heading textAlign="center" color="#fff">Add New Event</Heading>

      <Field.Root required>
      <Field.Label>
       Page will redirect after successful creation
      </Field.Label>

      <Field.Label>
      Event <Field.RequiredIndicator />
      </Field.Label>
      <Input
        type="text"
        value={Title}
        name="Title"
        id="Title"
        placeholder="Enter event name"
        aria-required="true"
        aria-label="Event Title"
        onChange={e => setTitle(e.target.value)}
      />

      <Field.Label>
      Description <Field.RequiredIndicator />
      </Field.Label>
      <textarea
        rows="4"
        type="text"
        autoComplete="on"
        autoCorrect="on"
        spellCheck="true"
        maxLength="100"
        style={{ width: '100%', padding: '8px', border: '2px solid #333', background: '#222', color: '#fff' }}
        value={Description}
        name="Description"
        id="Description"
        placeholder="Enter event description"
        aria-required="true"
        aria-label="Event Description"
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
        aria-required="true"
        aria-label="Event Location"
        onChange={e => setLocation(e.target.value)}
      />
  
      <Field.Label>
      Date <Field.RequiredIndicator />
      </Field.Label>
      <Input
        type="date"
        value={DateInput}
        placeholder="Enter event dare"
        name="DateInput"
        id="DateInput"
        aria-required="true"
        aria-label="Event Date"
        onChange={e => setDateInput(e.target.value)}
      />

      <Field.Label>
      Time <Field.RequiredIndicator />
      </Field.Label>
      <Input
        type="time"
        value={TimeInput}
        placeholder="Eg. 12:30"
        name="TimeInput"
        id="TimeInput"
        aria-required="true"
        aria-label="Event Time"
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
        aria-required="true"
        aria-label="Event Category"
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

      <FileUpload.Root accept="image">
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <div className="button-center">
        <Button variant="outline" size="md" colorScheme="blue" leftIcon= {<LuFileImage />} onChange={e => setImage(e.target.files[0])}>
          <LuFileImage /> <span aria-label="Upload Images">Upload Images</span>
        </Button>
        </div>
      </FileUpload.Trigger>
      <FileUploadList />
      </FileUpload.Root>
      <div className="button-center">
      <button onClick={handleAddEvent} aria-label="Add Event" style={{background:'#0057b8',color:'#fff',borderRadius:'6px',padding:'8px 16px',border:'none'}}>ADD EVENT</button>
      </div>
      </Field.Root>
      </Box>
     </Card.Root>
    </Flex>
  );
}
