import React, { useState } from 'react';
import '@/assets/ContactPage.css';
import { Box,Input, Card, Flex } from "@chakra-ui/react"

export default function ContactPage({ sessionToken }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback("");
    // Optionally, handle form data here (e.g., send to API)

    const body = { name, email, message };
    const url = "http://127.0.0.1:4000/api/contact/contact";

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
        setFeedback("Thank you for your message! We'll get back to you soon.");
        setName("");
        setEmail("");
        setMessage("");
      }
      else {
        setFeedback("Failed to send message. Please try again.");
      }
    }
    catch (err) {
      setFeedback("Failed to send message. Please try again.");
      console.error("Failed to send", err);
    } finally {
      setSubmitting(false);

    }
  }
  
  return (
    <Flex minH="83vh" justify="center">
      <Card.Root
        bg="blackAlpha.700"
        rounded="3xl"
        overflow="hidden"
        boxShadow="md"
        transition="all 0.2s"
        _hover={{ boxShadow: "xl", transform: "translateY(-2px)" }}
      >
        <Box position="sticky" top="0" zIndex="sticky" py={4} px={6} textAlign="center">
          <div className="contact-container">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-intro">
              We'd love to hear from you! Whether you have feedback, a question, or just want to say hello, feel free to reach out.
            </p>
            <section className="contact-section">
              <h2>Email</h2>
              <p>
                📬 <a href="mailto:hello@friendlyfence.com">hello@friendlyfence.com</a>
              </p>
            </section>
            <section className="contact-section">
              <h2>Support & Help</h2>
              <p>
                For questions about posts, issues with the site, or to report something suspicious, email us at:
              </p>
              <p>
                🛠️ <a href="mailto:support@friendlyfence.com">support@friendlyfence.com</a>
              </p>
            </section>
            <section className="contact-section">
              <h2>Follow Us</h2>
              <p>
                🌐 Coming soon! We’re planning community-focused social channels.
              </p>
            </section>
            <section className="contact-form">
              <h2>Quick Message</h2>
              
              <form className="report-form" onSubmit={handleSubmit}>
                  <label>
                    Name<br />
                    <Input type="text" value={name} name="name" id="name" placeholder="Your Name" onChange={e => setName(e.target.value)} required />
                  </label>
                  <label>
                    Email<br />
                    <Input type="email" value={email} name="email" id="email"  placeholder="you@example.com" onChange={e => setEmail(e.target.value)} required />
                  </label>
                  <label>
                    Message<br />
                    <textarea type="text" value={message} name="message" id="message" rows="5" placeholder="What's on your mind?" onChange={e => setMessage(e.target.value)} required></textarea>
                  </label>
                  <div className="button-center">
                  <button type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Message"}
                   </button>
                  </div>
                </form>
            </section>
            {feedback && <p className="report-feedback">{feedback}</p>}
          </div>
        </Box>
      </Card.Root>
    </Flex>
  );
}
