import React, { useState } from "react";
import { Button, Textarea, Flex } from "@chakra-ui/react";

interface AddCommentProps {
  onPost: (content: string) => void;
}

export const AddComment = ({ onPost }: AddCommentProps) => {
  const [isCommentVisible, setCommentVisible] = useState(false);
  const [content, setContent] = useState("");

  const onSubmit = () => {
    if (content) {
      onPost(content);
      setContent("");
      setCommentVisible(false);
    }
  };

  return (
    <div className="py-4">
      <Button
        px={4}
        fontWeight={"semibold"}
        border={"1px solid #49A569"}
        color="#49A569"
        onClick={() => setCommentVisible(true)}
        className="mb-4"
      >
        Add Comment
      </Button>

      {isCommentVisible && (
        <div>
          <Textarea
            p={4}
            mb={3}
            border="1px solid black"
            size="md"
            bg="white"
            placeholder="What's on your mind..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Flex gap={2} mb={5}>
            <Button
              px={6}
              borderWidth={1}
              variant="outline"
              borderColor="#49A569"
              onClick={() => setCommentVisible(false)}
            >
              Cancel
            </Button>
            <Button onClick={onSubmit} px={8} bg="#49A569" color="white">
              Post
            </Button>
          </Flex>
        </div>
      )}
    </div>
  );
};
