
import React, { useState, useEffect, useCallback } from "react";
import { Box, Flex, Heading, Input, Select, Button } from "@chakra-ui/react";

const SearchEvent = ({ onResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = useCallback(async () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("title", searchTerm);
    if (category) params.append("category", category);
    if (date) params.append("date", date);
    if (location) params.append("location", location);
    const res = await fetch(`/api/events/search?${params.toString()}`);
    const data = await res.json();
    onResults(data);
  }, [searchTerm, category, date, location, onResults]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, category, date, location, handleSearch]);

  return (
    <Box position="sticky" top="0" zIndex="sticky" bg="white" boxShadow="sm" py={4} px={6}>
      <Flex align="center" justify="space-between" flexWrap="wrap" gap={4}>
        <Heading size="lg" color="gray.800">🧭 Community Events</Heading>
        <Input
          placeholder="Search by title..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          maxW="200px"
        />
        <Select placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} maxW="150px">
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
        </Select>
        <Input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          maxW="150px"
        />
        <Input
          placeholder="Location..."
          value={location}
          onChange={e => setLocation(e.target.value)}
          maxW="150px"
        />
        <Button onClick={handleSearch} colorScheme="blue">Search</Button>
      </Flex>
    </Box>
  );
};

export default SearchEvent;


