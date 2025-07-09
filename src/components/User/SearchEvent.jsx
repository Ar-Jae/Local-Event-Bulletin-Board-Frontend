import { Box, Flex, Heading, Input } from "@chakra-ui/react";

const Search = ({ searchTerm, setSearchTerm }) => (
  <Box
    position="sticky"
    top="0"
    zIndex="sticky"
    bg="white"
    boxShadow="sm"
    py={4}
    px={6}
  >
    <Flex align="center" justify="space-between" flexWrap="wrap" gap={4}>
      <Heading size="lg" color="gray.800">
        🧭 Community Events
      </Heading>
      <Input
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        maxW="300px"
      />
    </Flex>
  </Box>
);

export default Search;


