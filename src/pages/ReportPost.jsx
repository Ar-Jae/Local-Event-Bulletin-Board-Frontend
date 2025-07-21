import React, { useState, useEffect } from 'react';
import '@/assets/ReportPost.css';
import { Input, Box, Card, Flex } from "@chakra-ui/react";

export default function ReportPost({ sessionToken }) {
  const [post, setPost] = useState('');
  const [description, setDescription] = useState('');
  const [detail, setDetail] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReportPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback('');

    const body = { post, description, detail, email };
    const url = "http://127.0.0.1:4000/api/reportedPost/report";

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "authorization": sessionToken
        }
      });

      if (res.ok) {
        setFeedback("Report sent successfully. Thank you for helping keep the community safe!");
        setPost('');
        setDescription('');
        setDetail('');
        setEmail('');
      } else {
        setFeedback("Failed to send report. Please try again.");
      }
    } catch (err) {
      setFeedback("Failed to send report. Please try again.");
      console.error("Failed to send", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Flex minH="83vh" justify="center">
      <Card.Root bg="blackAlpha.700" rounded="3xl" overflow="hidden" boxShadow="md" transition="all 0.2s"
        _hover={{ boxShadow: "xl", transform: "translateY(-2px)" }}>
        <Box position="sticky" top="0" zIndex="sticky" py={4} px={6} textAlign="center">
          <div className="report-container">
            <h1 className="report-title">Report a Post</h1>
            <p className="report-intro">
              We’re here to keep the board safe, respectful, and neighborly. Use the form below to report any post that violates our community guidelines.
            </p>
            <form className="report-form" onSubmit={handleReportPost}>
              <label>
                Post Title or Description<br />
                <Input type="text" value={post} name="Post Title or Description" id="Post Title or Description" placeholder="What post are you reporting?" onChange={e => setPost(e.target.value)} required />
              </label>
              <label>
                Reason for Report<br />
                <Input type="text" value={description} name="Reason" id="Reason" placeholder="Why are you reporting this post?" onChange={e => setDescription(e.target.value)} required />
              </label>
              <label>
                Additional Details (optional)<br />
                <Input type="text" value={detail} name="Details" id="Details" placeholder="Any additional details?" onChange={e => setDetail(e.target.value)} />
              </label>
              <label>
                Your Email (optional)<br />
                <Input type="text" value={email} name="Email" id="Email" placeholder="Your email (optional)" onChange={e => setEmail(e.target.value)} />
              </label>
              <p className="report-note">
                Note: Your email is optional but helps us follow up if needed. We respect your privacy.
              </p>
              <button type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Report"}
              </button>
            </form>
            {feedback && <p className="report-feedback">{feedback}</p>}
          </div>
        </Box>
      </Card.Root>
    </Flex>
  );
}
