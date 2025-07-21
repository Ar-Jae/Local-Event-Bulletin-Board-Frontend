
import React from 'react'
import { useState, useEffect } from 'react';
import { Card, SimpleGrid, Box,HStack, Heading} from "@chakra-ui/react";


export default function ContactCard({ sessionToken }) {

    const [ContactCards, setContactCards] = useState([]);
    
    const fetchReport = () => {
      const url = "http://127.0.0.1:4000/api/contact/contacts";
  
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": sessionToken
        }
      })
        .then(res => res.json())
        .then(data => setContactCards(data))
        .catch(err => console.error(err));
    };
  
    useEffect(() => {
      fetchReport(sessionToken);
    }, []);
  
    return (
      <Box position="sticky" top="0" zIndex="sticky" py={4} px={6}
        _after={{ content: '""', position: "absolute", left: 0, right: 0, bottom: 0, height: "1px"}}
      >
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10}>
          
            {ContactCards.map((contact) => (
              <Card.Root key={contact._id}
                bg="blackAlpha.700"
                rounded="xl"
                overflow="hidden"
                boxShadow="md"
                transition="all 0.2s"
                _hover={{ boxShadow: "xl", transform: "translateY(-2px)" }}
              >
                <Heading as="h2" size="lg" color="white" mb={4}>
                  {contact.name}
                </Heading>
                <Card.Description>{contact.email}</Card.Description>
                <Card.Description color="white.500">{contact.message}</Card.Description>
                <HStack>
                  <Card.Description color="white.500">Reported by: {contact.email}</Card.Description>
                </HStack>
              </Card.Root>
            ))}
        </SimpleGrid>
      </Box>
    );
  }
// This code defines a React component called ReportCard that fetches and displays reported posts.
// It uses Chakra UI components for styling and layout.