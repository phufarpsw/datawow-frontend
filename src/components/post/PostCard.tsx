import { Badge, Box, Card, HStack, Text } from "@chakra-ui/react";
import { IPost, IUpdatePost } from "@/api-caller/post";
import { Avatar } from "../ui/avatar";
import { IoChatbubbleOutline } from "react-icons/io5";
import { ConfirmDeletePost } from "./ConfirmDeletePost";
import Link from "next/link";
import { UpdatePostDialog } from "./UpdatePostDialog";

interface IPostCardProps {
  isFirst: boolean;
  post: IPost;
  onDelete: (postId: string) => void;
  onUpdate: (post: IUpdatePost) => void;
}

export default function PostCard({ isFirst, post, onDelete, onUpdate }: IPostCardProps) {
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
      <Box w="full" position="relative">
        <Link href={`/post/${post.id}`} passHref>
          <Box style={{ textDecoration: "none", color: "inherit" }}>
            <Card.Body>
              <HStack w={"full"}>
                <Avatar name={post.user.username} />
                <Text>{post.user.username}</Text>
              </HStack>
              <HStack mt={3}>
                <Badge>{post.community}</Badge>
              </HStack>
              <Card.Title>{post.title}</Card.Title>
              <Card.Description truncate lineClamp={2}>
                {post.description}
              </Card.Description>
            </Card.Body>
            <Card.Footer>
              <IoChatbubbleOutline />
              <Text fontSize={"sm"}>{post._count.Comments ?? 0} Comments</Text>
            </Card.Footer>
          </Box>
        </Link>

        {post.authorId == userId && (
          <HStack position="absolute" top="5" right="10" spaceX={2}>
            <UpdatePostDialog post={post} onUpdate={onUpdate} />
            <ConfirmDeletePost postId={post.id} onDelete={onDelete} />
          </HStack>
        )}
      </Box>
    </Card.Root>
  );
}
