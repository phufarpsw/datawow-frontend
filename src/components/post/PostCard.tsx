import { Badge, Box, Card, HStack, IconButton, Text } from "@chakra-ui/react";
import { IPost } from "@/api-caller/post";
import { Avatar } from "../ui/avatar";
import { IoChatbubbleOutline } from "react-icons/io5";
import { CiEdit, CiTrash } from "react-icons/ci";
import { ConfirmDeletePost } from "./ConfirmDeletePost";

interface IPostCardProps {
  isFirst: boolean;
  post: IPost;
  onDelete: (postId: string) => void;
}

export default function PostCard({ isFirst, post, onDelete }: IPostCardProps) {
  const userId = localStorage.getItem("userId") || "";
  return (
    <Card.Root
      color={"black"}
      bg={"white"}
      flexDirection="row"
      overflow="hidden"
      roundedTop={isFirst ? "" : "none"}
      roundedBottom={"none"}
      mb={1}
    >
      <Box>
        <Card.Body>
          <HStack w={"full"}>
            <Avatar name={post.user.username} />
            <Text>{post.user.username}</Text>
            {post.authorId == userId && (
              <div className="absolute flex space-x-4 top-5 right-10">
                <IconButton aria-label="Edit Post" rounded="full">
                  <CiEdit size={24} />
                </IconButton>
                <ConfirmDeletePost postId={post.id} onDelete={onDelete}>
                  <IconButton aria-label="Delete Post" rounded="full">
                    <CiTrash size={24} />
                  </IconButton>
                </ConfirmDeletePost>
              </div>
            )}
          </HStack>
          <HStack mt={3}>
            <Badge>{post.community}</Badge>
          </HStack>
          <Card.Title>{post.title}</Card.Title>
          <Card.Description>{post.description}</Card.Description>
        </Card.Body>
        <Card.Footer>
          <IoChatbubbleOutline />
          <Text fontSize={"sm"}>{post._count.Comments ?? 0} Comments</Text>
        </Card.Footer>
      </Box>
    </Card.Root>
  );
}
