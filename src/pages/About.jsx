import '@/assets/AboutPage.css'; // Import the CSS file
import { Box, Card, Flex} from "@chakra-ui/react"

export default function AboutPage() {
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

    <div className="about-container">
      <h1 className="about-title">About Friendly Fence Bulletin</h1>

      <p className="about-intro">
        Welcome to your neighborhood’s digital fence post.
      </p>

      <p>
        At <strong>Friendly Fence Bulletin</strong>, we believe the best communities are built through connection,
        trust, and good old-fashioned neighborly communication — just like the conversations
        you’d have leaning over a backyard fence.
      </p>

      <section>
        <h2 className="section-title">What Is It?</h2>
        <ol>
          <li>🏷️ Yard sales and giveaways</li>
          <li>🐾 Lost & found pets</li>
          <li>🎉 Block parties and local events</li>
          <li>🧰 Services offered or needed</li>
          <li>📣 Neighborhood alerts and updates</li>
        </ol>
      </section>

      <section>
        <h2 className="section-title">Why We Built This</h2>
        <p>In an age of noisy feeds and spammy ads, we wanted something quieter, friendlier, and local. A space where people could:</p>
        <ol>
          <li>Communicate without clutter</li>
          <li>Find trustworthy, nearby information</li>
          <li>Strengthen the bonds within their own neighborhoods</li>
        </ol>
      </section>

      <section>
        <h2 className="section-title">How It Works</h2>
        <ol>
          <li>Sign up with your email or Google account</li>
          <li>Browse your neighborhood’s board</li>
          <li>Post a bulletin — quick and free</li>
          <li>Stay connected with what matters locally</li>
          <li>Wave hello (or “Thanks”) to your digital neighbors</li>
        </ol>
      </section>

      <section>
        <h2 className="section-title">Built by Locals, for Locals</h2>
        <p>
          We’re a small team who care deeply about neighborhoods. We believe in the power of shared space — even if it’s digital — to bring people together.
        </p>
        <p>
          Want to suggest a feature? Spot a bug? Say hi? 👉 <a href="mailto:hello@friendlyfence.com">hello@friendlyfence.com</a>
        </p>
      </section>

      <section className="mission">
        <h2 className="section-title">Our Mission</h2>
        <p>
          To bring neighbors closer together by making local communication simple, positive, and accessible.
        </p>
      </section>
    </div>
      </Box>
    </Card.Root>
 </Flex>
  );
}
