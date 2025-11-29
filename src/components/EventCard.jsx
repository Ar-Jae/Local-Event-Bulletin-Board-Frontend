import { Badge, Button, Card, Image, SimpleGrid, Box, HStack } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import '/src/assets/EventCard.css';


function formatDateTime(dateString, timeString) {
  // dateString: "2024-06-07T00:00:00.000Z" or "06/07/2024"
  // timeString: "14:30"
  let dateObj;
  if (dateString.includes('-')) {
    dateObj = new Date(dateString);
  } else {
    // fallback for MM/DD/YYYY
    dateObj = new Date(Date.parse(dateString));
    // Handle invalid date formats
  }
  if (isNaN(dateObj)) return "Invalid Date";

  // Format date as MM/DD/YYYY
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const year = dateObj.getFullYear();

  // Format time as hh:mm AM/PM
  let [hour, minute] = timeString.split(':');
  hour = parseInt(hour, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;

  return `${month}/${day}/${year} at ${hour.toString().padStart(2, '0')}:${minute} ${ampm}`;
}

// Add isAdmin and handler props
export default function EventCard({ events, isAdmin, onDelete, onEdit }) {
  const navigate = useNavigate();

  return (
    <Box position="sticky" top="0" zIndex="sticky" py={4} px={{ base: 2, md: 6 }}
      _after={{ content: '""', position: "absolute", left: 0, right: 0, bottom: 0, height: "1px" }}
    >
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: 4, md: 10 }}>

        {events.map(event => {
          
          return (
            <Card.Root key={event._id}
              bg="blackAlpha.700"
              rounded="3xl"
              overflow="hidden"
              boxShadow="md"
              transition="all 0.2s"
              _hover={{
                boxShadow: "xl",
                transform: "translateY(-2px)"
              }}
            >

              <Image
                borderRadius="3xl"
                objectFit="cover"
                width="100%"
                maxH="200px"
                src={event.ImageUrl || "https://images.unsplash.com/photo-1667489022797-ab608913feeb?auto=format&fit=crop&w=800&q=60"}
                alt="Event Image"
              />

              <Card.Body>

                <Card.Title color="white" size="md">{event.Title}</Card.Title>
                <Card.Description>{event.Description}</Card.Description>
                <Card.Description color="white.500">{event.Location}</Card.Description>
                <Card.Description>
                  {event.Date && event.Time ? (
                    <>
                      {formatDateTime(event.Date, event.Time)}
                    </>
                  ) : (
                    "Date/Time not available"
                  )}
                </Card.Description>

                <HStack>
                  <Badge>{event.Category}</Badge>
                </HStack>

                <HStack mt={2}>

                <Button onClick={() => navigate(`/rsvp/${event._id}`)}>RSVP</Button>
                
                {isAdmin && (
                  <>
                    <Button onClick={() => onEdit(event)}>Edit</Button> {/* ⬅ Pass full event */}
    
                    <Button colorScheme="red" onClick={() => onDelete(event._id)}>Delete</Button> 
                  </>
                )}
                </HStack>
              </Card.Body>
            </Card.Root>
          );
        })}
      </SimpleGrid>
    </Box>
  )
}
