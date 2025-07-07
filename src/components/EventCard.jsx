import { Badge, Button, Card, Image, Text, Heading, Stack, SimpleGrid, Box} from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@/assets/EventCard.css';
import EditEvent from "@/eventControl/EditEvent";
import DeleteEvent from "@/eventControl/DeleteEvent";
import RSVPEvent from "@/eventControl/RSVPEvent";
import ShareEvent from "@/eventControl/ShareEvent";



export default function EventCard({ events }) {

  return (
    <Box position="sticky" top="0" zIndex="sticky" boxShadow="sm" py={4} px={6}
  _after={{ content: '""', position: "absolute", left: 0, right: 0, bottom: 0, height: "1px",
  boxShadow: "0 1px 10px rgba(0, 0, 0, 0.1)",}}
>
  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10}>

    {events.map((event) => (

      <Card.Root key={event._id}
      bg="blackAlpha.700"
      rounded="3xl"
      overflow="hidden"
      boxShadow="md"
      transition="all 0.2s"
      _hover={{ boxShadow: "xl", transform: "translateY(-2px)" }}>

        <Image
          objectFit="cover"
          maxW="auto"
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?auto=format&fit=crop&w=800&q=60"
          alt="Event Image"
        />
        
        <Card.Body>
          <Stack spacing={2} p={4}>
            <Heading color="white" size="md">{event.Title}</Heading>
            <Text>{event.Description}</Text>
            <Text color="white.500">{event.Location}</Text>
            <Text>
              {new Date(event.Date).toLocaleDateString()} at{" "}
              {new Date(event.Time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <Badge colorScheme="teal">{event.Category}</Badge>
            <Text color="gray.500">Created by: {event._id}</Text>
          </Stack>
        </Card.Body>
        
        <Card.Footer display="flex" justifyContent="space-between" >
          <Router>
            <Routes>
              <Route path="/edit/:id" element={<EditEvent />} />
              <Route path="/delete/:id" element={<DeleteEvent />} />
              <Route path="/rsvp/:id" element={<RSVPEvent />} />
              <Route path="/share/:id" element={<ShareEvent />} />
            </Routes>
          </Router>
          <Button onClick={() => window.location.href = `/rsvp/${event._id}`}>RSVP</Button> 
        </Card.Footer>
      </Card.Root>
    ))}
</SimpleGrid>
</Box>
)
}
