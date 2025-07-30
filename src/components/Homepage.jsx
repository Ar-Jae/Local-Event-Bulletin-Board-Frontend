import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
 
function Homepage() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="xl" mb={4}>
        Welcome to the Friendly Fence Bulletin Board
      </Heading>
      <Text fontSize="lg" mb={2}>
        Please log in or sign up to continue.
      </Text>
      <Text>
        This is your neighborhood bulletin board for sharing news, events, and community updates.
        Whether you're looking to post an event, share a local business, or connect with neighbors,
        you've come to the right place!
      </Text>
    </Box>
  );
}
export default Homepage;
