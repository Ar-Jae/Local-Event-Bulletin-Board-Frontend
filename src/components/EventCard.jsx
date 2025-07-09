import { Badge, Button, Card, Image, Text, Heading, Stack, SimpleGrid, Box,HStack} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import '@/assets/EventCard.css';


export default function EventCard({ events }) {
  const navigate = useNavigate();

  return (
    
    <Box position="sticky" top="0" zIndex="sticky" py={4} px={6}
  _after={{ content: '""', position: "absolute", left: 0, right: 0, bottom: 0, height: "1px"}}
>
  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10}>

    {events.map((event) => (

      <Card.Root key={event._id}
      bg="blackAlpha.700"
      rounded="3xl"
      overflow="hidden"
      boxShadow="md"
      transition="all 0.2s"
      _hover={{ boxShadow: "xl", 
      transform: "translateY(-2px)"}}
      >

      <Image
          borderRadius="3xl"
          objectFit="cover"
          maxW="auto"
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
                  {new Date(`${event.Date}T${event.Time}`).toLocaleDateString()} at{" "}
                  {new Date(`${event.Date}T${event.Time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </>
              ) : (
                "Date/Time not available"
              )}
            </Card.Description>
            
        <HStack>
          <Badge>{event.Category}</Badge>
        </HStack>

        <Button onClick={() => navigate(`/rsvp/${event._id}`)}>RSVP</Button>

      </Card.Body>
      </Card.Root>
    ))}
</SimpleGrid>
</Box>
)
}
