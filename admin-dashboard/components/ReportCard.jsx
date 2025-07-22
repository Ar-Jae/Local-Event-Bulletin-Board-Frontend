import React from 'react'
import { useState, useEffect } from 'react';
import { Card, SimpleGrid, Box,HStack, Heading} from "@chakra-ui/react";


export default function ReportCard({ sessionToken }) {

    const [reportedPosts, setReportedPosts] = useState([]);
    
    const fetchReport = () => {
      const url = "http://127.0.0.1:4000/api/reportedPost/reports";
  
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": sessionToken
        }
      })
        .then(res => res.json())
        .then(data => setReportedPosts(data))
        .catch(err => console.error(err));
    };
  
    useEffect(() => {
      fetchReport(sessionToken);
    }, []);
  
    return (
      
      <Box position="sticky" top="0" zIndex="sticky" py={4} px={6}
        _after={{ content: '""', position: "absolute", left: 0, right: 0, bottom: 0, height: "1px"}}
      >
        <Heading as="h1" size="xl" mb={6} color="white">Reported Posts</Heading>
       
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10}>
          
            {reportedPosts.map((post) => (
              <Card.Root
                key={post._id}
                bg="rgba(30,30,30,0.92)"
                rounded="xl"
                overflow="hidden"
                boxShadow="lg"
                transition="all 0.2s"
                _hover={{ boxShadow: "2xl", transform: "translateY(-4px) scale(1.01)" }}
                p={6}
              >
                <Heading as="h2" size="md" color="#ffd700" mb={2}>
                  {post.post}
                </Heading>
                <Card.Description color="#eee" mb={2}>
                  {post.description}
                </Card.Description>
                <Card.Description color="#bbb" mb={2}>
                  {post.detail}
                </Card.Description>
                <HStack mt={2}>
                  <Card.Description color="#1e88e5" fontSize="sm">
                    Reported by: {post.email}
                  </Card.Description>
                </HStack>
              </Card.Root>
            ))}
        </SimpleGrid>
      </Box>

      
    );
  }
// This code defines a React component called ReportCard that fetches and displays reported posts.
// It uses Chakra UI components for styling and layout.