import React, { useEffect, useState } from 'react';
import { Box, IconButton, Badge, Menu, MenuItem, Spinner } from '@chakra-ui/react';

export default function NotificationDropdown({ userId, sessionToken }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/notification/user/${userId}`, {
      headers: { 'authorization': sessionToken }
    })
      .then(res => res.json())
      .then(data => {
        setNotifications(data);
        setLoading(false);
      });
  }, [userId, sessionToken]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Box position="relative" display="inline-block">
      <IconButton
        variant="outline"
        aria-label="Show notifications"
        onClick={() => setShowDropdown(v => !v)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        {unreadCount > 0 && <Badge colorScheme="red" ml={1}>{unreadCount}</Badge>}
      </IconButton>
      {showDropdown && (
        <Box position="absolute" right={0} mt={2} minW="300px" bg="white" boxShadow="md" borderRadius="md" zIndex={10}>
          {loading ? <Spinner /> : (
            notifications.length === 0 ? (
              <Box p={3}>No notifications</Box>
            ) : notifications.map(n => (
              <Box key={n._id} p={3} fontWeight={n.read ? 'normal' : 'bold'} borderBottom="1px solid #eee">
                {n.message}
              </Box>
            ))
          )}
        </Box>
      )}
    </Box>
  );
}
