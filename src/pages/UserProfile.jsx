import React, { useEffect, useState } from 'react';
import { Box, Heading, Avatar, Text, VStack, Spinner, SimpleGrid } from '@chakra-ui/react';

const UserProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/userprofile/${userId}`)
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <Spinner />;
  if (!profile) return <Text>User not found.</Text>;

  return (
    <Box maxW="700px" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg" bg="gray.50">
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar size="lg" name={profile.user.firstName} mr={4} />
        <Box>
          <Heading size="md">{profile.user.firstName} {profile.user.lastName}</Heading>
          <Text color="gray.600">{profile.user.email}</Text>
        </Box>
      </Box>
      <Divider mb={4} />
      <Heading size="sm" mb={2}>Posted Events</Heading>
      <SimpleGrid columns={1} spacing={3} mb={4}>
        {profile.events.length === 0 ? <Text>No events posted.</Text> : profile.events.map(e => (
          <Box key={e._id} p={3} bg="white" borderRadius="md" boxShadow="sm">
            <Text fontWeight="bold">{e.title}</Text>
            <Text fontSize="sm" color="gray.500">{new Date(e.date).toLocaleDateString()}</Text>
          </Box>
        ))}
      </SimpleGrid>
      <Heading size="sm" mb={2}>RSVPs</Heading>
      <SimpleGrid columns={1} spacing={3}>
        {profile.rsvps.length === 0 ? <Text>No RSVPs yet.</Text> : profile.rsvps.map(r => (
          <Box key={r._id} p={3} bg="white" borderRadius="md" boxShadow="sm">
            <Text fontWeight="bold">{r.eventId?.title}</Text>
            <Text fontSize="sm" color="gray.500">{r.eventId?.date ? new Date(r.eventId.date).toLocaleDateString() : ''}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default UserProfile;
