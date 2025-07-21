import React, { useEffect } from 'react';
import '@/assets/PrivacyPolicy.css';
import { Box, Card, Flex } from "@chakra-ui/react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (

    <Flex minH="100vh" justify="center">
        
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

    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>

      <p className="privacy-intro">
        Effective Date: July 1, 2025
      </p>

      <p>
        At <strong>Friendly Fence Bulletin</strong>, your privacy matters. This policy explains what information we collect, how we use it, and your choices regarding your data.
      </p>

      <section>
        <h2>1. Information We Collect</h2>
        <ol>
          <li><strong>Posts & Submissions:</strong> When you create a bulletin, we store your message, location (if included), and any contact info you provide.</li>
          <li><strong>Usage Data:</strong> We may collect non-identifying data like pages viewed or time spent on site to improve our service.</li>
          <li><strong>Optional Contact Info:</strong> If you choose to share your name or email, we’ll only use it for communication related to your post.</li>
        </ol>
      </section>

      <section>
        <h2>2. How We Use Your Information</h2>
        <ol>
          <li>To display bulletins on your local board</li>
          <li>To improve site features and performance</li>
          <li>To respond to reports or contact requests</li>
        </ol>
      </section>

      <section>
        <h2>3. Data Sharing</h2>
        <p>We do <strong>not sell or share</strong> your personal data with third parties. Your posts are only visible to visitors of your local bulletin board.</p>
      </section>

      <section>
        <h2>4. Cookies</h2>
        <p>We use simple cookies for session management and anonymous usage tracking. You can disable cookies in your browser at any time.</p>
      </section>

      <section>
        <h2>5. Your Rights</h2>
        <ol>
          <li>You may request that we delete your posts or data</li>
          <li>You can contact us at <a href="mailto:privacy@friendlyfence.com">privacy@friendlyfence.com</a> with any questions</li>
        </ol>
      </section>

      <section>
        <h2>6. Updates to This Policy</h2>
        <p>We may update this Privacy Policy occasionally. Any changes will be posted on this page with the updated date.</p>
      </section>

      <section className="privacy-contact">
        <h2>Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please email us at <a href="mailto:privacy@friendlyfence.com">privacy@friendlyfence.com</a>.</p>
      </section>
    </div>
    </Box>
  </Card.Root>
</Flex>
  );
}
