// components/Card.js
import { Box, Heading, Text } from "@chakra-ui/react";

interface IPostCardProps {
  title: string;
  description: string;
  history: string;
}

export default function Card({ title, description, history }: IPostCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
      <Heading size="md">{title}</Heading>
      <Text>{description}</Text>
      <Text fontSize="sm" color="gray.500">
        {history}
      </Text>
    </Box>
  );
}
