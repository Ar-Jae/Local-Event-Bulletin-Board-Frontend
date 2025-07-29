import React, { useEffect, useState } from 'react';
import { Box, Heading, Stat, StatLabel, Text, SimpleGrid, Spinner } from '@chakra-ui/react';

export default function AnalyticsDashboard({ sessionToken }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:4000/api/events/analytics', {
      headers: { 'authorization': sessionToken }
    })
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      });
  }, [sessionToken]);

  if (loading) return <Spinner />;
  if (!stats) return <Box>Unable to load analytics.</Box>;

  return (
    <Box maxW="600px" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg" bg="gray.50">
      <Heading mb={4}>Analytics Dashboard</Heading>
      <SimpleGrid columns={2} spacing={6}>
        <Stat>
          <StatLabel>Total Events</StatLabel>
          <Text fontSize="2xl" fontWeight="bold">{stats.totalEvents}</Text>
        </Stat>
        <Stat>
          <StatLabel>Pending Events</StatLabel>
          <Text fontSize="2xl" fontWeight="bold">{stats.pendingEvents}</Text>
        </Stat>
        <Stat>
          <StatLabel>Approved Events</StatLabel>
          <Text fontSize="2xl" fontWeight="bold">{stats.approvedEvents}</Text>
        </Stat>
        <Stat>
          <StatLabel>Total Users</StatLabel>
          <Text fontSize="2xl" fontWeight="bold">{stats.totalUsers}</Text>
        </Stat>
        <Stat>
          <StatLabel>Total RSVPs</StatLabel>
          <Text fontSize="2xl" fontWeight="bold">{stats.totalRSVPs}</Text>
        </Stat>
      </SimpleGrid>
    </Box>
  );
}
