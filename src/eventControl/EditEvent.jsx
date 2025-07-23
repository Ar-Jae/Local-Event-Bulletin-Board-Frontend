import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Input, Box, Card, Flex, Heading, Button, FileUpload, Float, useFileUploadContext } from "@chakra-ui/react"
import { LuFileImage, LuX } from "react-icons/lu"
import '@/assets/CreateEvent.css';

export default function EditEvent({ sessionToken, event }) {
  const [Title, setTitle] = useState(event?.Title || '');
  const [Description, setDescription] = useState(event?.Description || '');
  const [Location, setLocation] = useState(event?.Location || '');
  const [DateInput, setDateInput] = useState(event?.Date?.slice(0, 10) || '');
  const [TimeInput, setTimeInput] = useState(event?.Time || '');
  const [Category, setCategory] = useState(event?.Category || '');
  const [Image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleEditEvent = async (e) => {
    e.preventDefault();
    const date = new Date(`${DateInput}T00:00:00Z`);
    const eventData = {
      Title,
      Description,
      Location,
      Date: date.toISOString(),
      Time: TimeInput.slice(0, 5),
      Category,
      ImageUrl: Image ? Image.name : event?.ImageUrl, // or however your backend expects it
    };

    try {
      const res = await fetch(`http://127.0.0.1:4000/api/events/${event._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "authorization": sessionToken
        },
        body: JSON.stringify(eventData)
      });
      const data = await res.json();
      console.log("Event updated:", data);
      navigate("/events");
    } catch (err) {
      console.error(err);
    }
  };

  const FileUploadList = () => {
    const fileUpload = useFileUploadContext();
    const files = fileUpload.acceptedFiles;
    if (files.length === 0) return null;

    return (
      <FileUpload.ItemGroup>
        {files.map((file) => (
          <FileUpload.Item w="auto" boxSize="10" p="2" file={file} key={file.name}>
            <FileUpload.ItemPreviewImage />
            <Float placement="top-end">
              <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
                <LuX />
              </FileUpload.ItemDeleteTrigger>
            </Float>
          </FileUpload.Item>
        ))}
      </FileUpload.ItemGroup>
    );
  };

  return (
    <Flex minH="83vh" justify="center" align="center">
      <Card.Root
        bg="blackAlpha.700"
        rounded="3xl"
        overflow="hidden"
        boxShadow="md"
        transition="all 0.2s"
        _hover={{ boxShadow: "xl", transform: "translateY(-2px)" }}
      >
        <Box position="sticky" top="0" zIndex="sticky" py={4} px={6}>
          <Heading textAlign="center">Edit Event</Heading>

          <Field.Root required>
            <Field.Label>Page will redirect after successful update</Field.Label>

            <Field.Label>Event <Field.RequiredIndicator /></Field.Label>
            <Input
              type="text"
              value={Title}
              name="Title"
              id="Title"
              placeholder="Enter event name"
              onChange={e => setTitle(e.target.value)}
            />

            <Field.Label>Description <Field.RequiredIndicator /></Field.Label>
            <textarea
              rows="4"
              type="text"
              autoComplete="on"
              autoCorrect="on"
              spellCheck="true"
              maxLength="100"
              style={{ width: '100%', padding: '8px', border: '2px solid #333' }}
              value={Description}
              name="Description"
              id="Description"
              placeholder="Enter event description"
              onChange={e => setDescription(e.target.value)}
            />

            <Field.Label>Location <Field.RequiredIndicator /></Field.Label>
            <Input
              type="text"
              value={Location}
              name="Location"
              id="Location"
              placeholder="Enter event location"
              autoComplete="street-address"
              onChange={e => setLocation(e.target.value)}
            />

            <Field.Label>Date <Field.RequiredIndicator /></Field.Label>
            <Input
              type="date"
              value={DateInput}
              name="DateInput"
              id="DateInput"
              onChange={e => setDateInput(e.target.value)}
            />

            <Field.Label>Time <Field.RequiredIndicator /></Field.Label>
            <Input
              type="time"
              value={TimeInput}
              name="TimeInput"
              id="TimeInput"
              onChange={e => setTimeInput(e.target.value)}
            />

            <Field.Label>Category <Field.RequiredIndicator /></Field.Label>
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

            <FileUpload.Root
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            >
              <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild>
                <div className="button-center">
                  <Button variant="outline" size="md" colorScheme="blue" leftIcon={<LuFileImage />}>
                    Upload Image
                  </Button>
                </div>
              </FileUpload.Trigger>
              <FileUploadList />
            </FileUpload.Root>

            <div className="button-center">
              <button onClick={handleEditEvent}>EDIT EVENT</button>
            </div>
          </Field.Root>
        </Box>
      </Card.Root>
    </Flex>
  );
}
