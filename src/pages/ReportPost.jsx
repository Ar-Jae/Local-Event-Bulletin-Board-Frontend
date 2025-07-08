import React from 'react';
import '@/assets/ReportPost.css';
import { useState } from 'react';
import { Input } from "@chakra-ui/react"
import { Box, Card, Flex } from "@chakra-ui/react";

export default function ReportPost({ sessionToken }) {
  const [post, setPost] = useState('');
  const [description, setDescription] = useState('');
  const [detail, setDetail] = useState('');
  const [email, setEmail] = useState('');

  const handleReportPost = async (e) => {
    e.preventDefault();

    const body = { 
      post, 
      description, 
      detail, 
      email
    };

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

      const data = await res.json();
      console.log("Report Sent", data);

    } catch (err) {
      console.error("Failed to send", err);
    }
  };

  return (

    <Flex minH="83vh" justify="center">
        
      <Card.Root bg="blackAlpha.700"
        rounded="3xl"
        overflow="hidden"
        boxShadow="md"
        transition="all 0.2s"
        _hover={{ boxShadow: "xl", 
        transform: "translateY(-2px)"}}>
        
      <Box
        position="sticky" top="0" zIndex="sticky" py={4} px={6}
        textAlign="center"
      >

    <div className="report-container">
      <h1 className="report-title">Report a Post</h1>

      <p className="report-intro">
        We’re here to keep the board safe, respectful, and neighborly. Use the form below to report any post that violates our community guidelines.
      </p>

      <form className="report-form">
        <label>
          Post Title or Description<br />
          <Input type="text" value={post} name="Post Title or Description" id="Post Title or Description" placeholder="What post are you reporting?" onChange={e => setPost(e.target.value)} required />
        </label>

        <label>
          Reason for Report<br />
          <select name="reason" value={detail} onChange={e => setDescription(e.target.value)} id="detail" required>
            <option value="">-- Select a reason --</option>
            <option value="spam">Spam or scam</option>
            <option value="offensive">Offensive or inappropriate content</option>
            <option value="misleading">False or misleading information</option>
            <option value="privacy">Violates someone’s privacy</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Additional Details (optional)<br />
          <textarea  type="details" name="details" value={detail} id= "details"  rows="5" placeholder="Anything else we should know?" onChange={e => setDetail(e.target.value)} ></textarea>
        </label>

        <label>
          Your Email (optional)<br />
          <Input type="email" value={email} name="email" id="email" placeholder="you@example.com" onChange={e => setEmail(e.target.value)}  />
        </label>

        <button onClick={handleReportPost}>Submit Report</button>

      </form>

      <p className="report-note">
        ⚠️ We don’t tolerate false reports. All reports are reviewed manually and kept confidential.
      </p>
    </div>
    </Box>
  </Card.Root>
</Flex>
  );
}
