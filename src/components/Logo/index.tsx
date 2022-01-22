import React from "react";
import { Link } from "react-router-dom";
import { Box, BoxProps, Heading, Text } from "@chakra-ui/react";

export default function Logo(props: BoxProps) {
  return (
    <Box dipslay="flex" flexDirection="column" w="100%" {...props}>
      <Link to="/" style={{ padding: 0 }}>
        <Heading
          as="h6"
          size="md"
          fontWeight="bold"
          color={["white", "white", "white", "primary.500"]}
          p="0"
        >
          Platz
          <Text as="span" display="block" fontSize="0.85rem" fontWeight="400">
            Market
          </Text>
        </Heading>
      </Link>
    </Box>
  );
}
