import React, { useState, useEffect } from 'react';
import { Box, Textarea, Button, Avatar, VStack, Text, Spinner } from '@chakra-ui/react';

const CommentSection = ({ eventId, user }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/comment/event/${eventId}`)
      .then(res => res.json())
      .then(data => {
        setComments(data);
        setLoading(false);
      });
  }, [eventId]);

  const handlePost = async () => {
    if (!text.trim()) return;
    setPosting(true);
    await fetch('/api/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, userId: user._id, text })
    });
    setText('');
    setPosting(false);
    setLoading(true);
    fetch(`/api/comment/event/${eventId}`)
      .then(res => res.json())
      .then(data => {
        setComments(data);
        setLoading(false);
      });
  };

  return (
    <Box mt={8} p={4} borderWidth={1} borderRadius="lg" bg="gray.50">
      <Text fontWeight="bold" mb={2}>Discussion</Text>
      {user && (
        <Box mb={4} display="flex" alignItems="center">
          <Avatar size="sm" name={user.firstName} mr={2} />
          <Textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Add a comment..."
            size="sm"
            maxLength={500}
            mr={2}
          />
          <Button onClick={handlePost} isLoading={posting} colorScheme="blue" ml={2}>Post</Button>
        </Box>
      )}
      {loading ? <Spinner /> : (
        <VStack align="start" spacing={3}>
          {comments.length === 0 ? <Text>No comments yet.</Text> : comments.map(c => (
            <Box key={c._id} p={2} bg="white" borderRadius="md" boxShadow="sm" w="100%">
              <Box display="flex" alignItems="center" mb={1}>
                <Avatar size="xs" name={c.userId?.firstName} mr={2} />
                <Text fontWeight="semibold">{c.userId?.firstName} {c.userId?.lastName}</Text>
                <Text fontSize="xs" color="gray.500" ml={2}>{new Date(c.createdAt).toLocaleString()}</Text>
              </Box>
              <Text>{c.text}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default CommentSection;
