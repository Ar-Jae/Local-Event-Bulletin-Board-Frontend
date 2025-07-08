import React from 'react';
import '@/assets/ContactPage.css';
import { Box, Card, Flex} from "@chakra-ui/react"

export default function ContactPage() {
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
        <form>
          <label>
            Name<br />
            <input type="text" name="name" placeholder="Your Name" required />
          </label>
          <label>
            Email<br />
            <input type="email" name="email" placeholder="you@example.com" required />
          </label>
          <label>
            Message<br />
            <textarea name="message" rows="5" placeholder="What's on your mind?" required></textarea>
          </label>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
    </Box>
  </Card.Root>
</Flex>
  );
}
