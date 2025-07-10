import '@/assets/SentReports.css';
import React from 'react'
import { useState, useEffect } from 'react';
import { Card, Text, SimpleGrid, Box,HStack, Heading} from "@chakra-ui/react";


export default function ReportCard({ sessionToken }) {

    const [reportedPosts, setReportedPosts] = useState([]);
    
    const fetchReported = () => {
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
      if (sessionToken) fetchReported();
    }, [sessionToken]);
  
    return (
      <Box position="sticky" top="0" zIndex="sticky" py={4} px={6}
        _after={{ content: '""', position: "absolute", left: 0, right: 0, bottom: 0, height: "1px"}}
      >
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10}>
          {reportedPosts.length === 0 ? (
            <Text>No reports found.</Text>
          ) : (
            reportedPosts.map((post) => (
              <Card.Root key={post._id} className="idk"
                bg="blackAlpha.700"
                rounded="xl"
                overflow="hidden"
                boxShadow="md"
                transition="all 0.2s"
                _hover={{ boxShadow: "xl", transform: "translateY(-2px)" }}
              >
                <Heading as="h2" size="lg" color="white" mb={4}>
                  {post.post}
                </Heading>
                <Card.Description>{post.description}</Card.Description>
                <Card.Description color="white.500">{post.detail}</Card.Description>
                <HStack>
                  {/* ...other content... */}
                </HStack>
              </Card.Root>
            ))
          )}
        </SimpleGrid>
      </Box>
    );
  }
// This code defines a React component called ReportCard that fetches and displays reported posts.
// It uses Chakra UI components for styling and layout.