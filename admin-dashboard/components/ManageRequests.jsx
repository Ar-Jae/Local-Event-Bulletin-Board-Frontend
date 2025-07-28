import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Card,
  HStack,
  Stack,
  Strong,
  Text,
} from "@chakra-ui/react";
import { LuCheck, LuX } from "react-icons/lu";
import '../assets/ContactCard.css';

export default function ManageRequests({ sessionToken }) {
  const [requests, setRequests] = useState([]);

  const fetchRequests = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:4000';
    const url = `${API_BASE_URL}/api/adminUser/pending`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": sessionToken
      }
    })
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchRequests();
  }, [sessionToken]);

  const handleApprove = async (requestId) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:4000';
    await fetch(`${API_BASE_URL}/api/adminUser/approve/${requestId}`, { method: 'POST' });
    setRequests(requests.filter(r => r._id !== requestId));
  };

  const handleDisapprove = async (requestId) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:4000';
    await fetch(`${API_BASE_URL}/api/adminUser/disapprove/${requestId}`, { method: 'POST' });
    setRequests(requests.filter(r => r._id !== requestId));
  };

  return (
    <Stack py={4} px={6} gap={4} align="center">
      {requests.length === 0 ? (
        <Text>No pending requests.</Text>
      ) : (
        requests.map(request => (
          <Card.Root width="320px" key={request._id}>
            <Card.Body>
              <HStack mb="6" gap="3">
                <Avatar.Root>
                  <Avatar.Image src={request.avatarUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(request.firstName + " " + request.lastName)} />
                  <Avatar.Fallback name={request.firstName + " " + request.lastName} />
                </Avatar.Root>
                <Stack gap="0">
                  <Text fontWeight="semibold" textStyle="sm">
                    {request.firstName} {request.lastName}
                  </Text>
                  <Text color="fg.muted" textStyle="sm">
                    {request.email}
                  </Text>
                </Stack>
              </HStack>
              <Card.Description>
                <Strong color="fg">{request.firstName} {request.lastName}</Strong> has requested admin access. You can approve or decline their request.
              </Card.Description>
            </Card.Body>
            <Card.Footer>
              <Button variant="subtle" colorPalette="red" flex="1" onClick={() => handleDisapprove(request._id)}>
                <LuX /> Decline
              </Button>
              <Button variant="subtle" colorPalette="blue" flex="1" onClick={() => handleApprove(request._id)}>
                <LuCheck /> Approve
              </Button>
            </Card.Footer>
          </Card.Root>
        ))
      )}
    </Stack>
  );
}
