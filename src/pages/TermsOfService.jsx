import React from 'react';
import '@/assets/TermsOfService.css';
import { Box, Card, Flex } from "@chakra-ui/react";

export default function TermsOfService() {
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
    
    <div className="tos-container">
      <h1 className="tos-title">Terms of Service</h1>

      <p className="tos-intro">Effective Date: July 1, 2025</p>

      <p>
        Welcome to <strong>Friendly Fence Bulletin</strong>! By using our site, you agree to the terms below.
        Please read them carefully.
      </p>

      <section>
        <h2>1. Using the Site</h2>
        <p>
          You may use Friendly Fence Bulletin to post and view community notices like events,
          sales, and services. You agree to use the site responsibly and legally.
        </p>
      </section>

      <section>
        <h2>2. User Responsibilities</h2>
        <ol>
          <li>You must not post anything illegal, offensive, or misleading.</li>
          <li>You are responsible for the accuracy of the content you share.</li>
          <li>You must not impersonate others or use false identities.</li>
        </ol>
      </section>

      <section>
        <h2>3. Content Guidelines</h2>
        <p>
          We aim to keep our board clean, helpful, and respectful. We may remove or hide posts that:
        </p>
        <ol>
          <li>Include hate speech, spam, or scams</li>
          <li>Promote unsafe or illegal activity</li>
          <li>Don’t follow basic community standards</li>
        </ol>
      </section>

      <section>
        <h2>4. Post Visibility</h2>
        <p>
          Posts you make may be visible to others in your area. Do not include private or sensitive information unless you're comfortable sharing it.
        </p>
      </section>

      <section>
        <h2>5. Account & Access</h2>
        <p>
          Most features are available without an account. If you create an account in the future, you are responsible for keeping your login credentials secure.
        </p>
      </section>

      <section>
        <h2>6. Termination</h2>
        <p>
          We reserve the right to remove posts or restrict access to users who violate these terms.
        </p>
      </section>

      <section>
        <h2>7. Changes to Terms</h2>
        <p>
          These terms may change from time to time. Updates will be posted here with a new effective date.
        </p>
      </section>

      <section>
        <h2>8. Contact</h2>
        <p>
          Questions? Reach out at <a href="mailto:legal@friendlyfence.com">legal@friendlyfence.com</a>
        </p>
      </section>
    </div>
    </Box>
  </Card.Root>               
</Flex>
  );
}
