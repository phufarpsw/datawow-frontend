"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Stack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { getPostById, IPost } from "@/api-caller/post";
import { useParams } from "next/navigation";
import { formatDate } from "@/utils/formatDate";
import { IoChatbubbleOutline } from "react-icons/io5";
import {
  createComment,
  getCommentByPostId,
  IComment,
  ICreateComment,
} from "@/api-caller/comment";
import { AddComment } from "@/components/comment/AddComment";

export default function PostDetail() {
  const [post, setPost] = useState<IPost>();
  const [comments, setComments] = useState<IComment[]>();
  const params = useParams();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (!params.id) return;
    const fetchPost = async () => {
      const response = await getPostById(params.id as string);
      setPost(response);
    };

    const fetchComments = async () => {
      const response = await getCommentByPostId(params.id as string);
      setComments(response);
    };

    fetchComments();
    fetchPost();
  }, [params.id]);

  const onPost = async (content: string) => {
    if (userId) {
      const body: ICreateComment = {
        content,
        postId: params.id as string,
        authorId: userId ?? "",
      };
      await createComment(body);
    } else {
      alert("Please Login First");
    }
  };
  return (
    <Stack w={"full"} bg={"white"} color={"black"} py={16} px={32}>
      {/* Header */}
      <Link
        href={"/"}
        className="w-10 h-10 text-xl mb-6 flex justify-center items-center rounded-full bg-[#D8E9E4]"
      >
        <AiOutlineArrowLeft />
      </Link>

      {post && (
        <>
          <Flex align="center" mb={4}>
            <Avatar name={post?.user.username} size="lg" mr={3} />
            <Box>
              <Text fontWeight="bold">{post?.user.username}</Text>
              <Text fontSize="sm" color="gray.500">
                {formatDate(post?.updatedAt ?? new Date())} ago
              </Text>
            </Box>
          </Flex>
          <HStack>
            <Badge>{post?.community}</Badge>
          </HStack>

          <Box mb={5}>
            <Heading fontSize={32} mb={3} fontWeight={"semibold"}>
              {post?.title}
            </Heading>
            <Text fontSize="md" color="gray.700">
              {post?.description}
            </Text>
          </Box>
        </>
      )}

      <Flex spaceX={2} alignItems={"center"}>
        <IoChatbubbleOutline />
        <Text fontSize={"sm"}>{comments?.length ?? 0} Comments</Text>
      </Flex>
      <AddComment onPost={onPost} />

      <Box>
        {comments?.map((comment, index) => (
          <Flex key={index} align="flex-start" mb={4}>
            <Avatar name={comment.user.username} size="sm" mr={3} mt={1} />
            <Box>
              <Text fontWeight="bold">{comment.user.username}</Text>
              <Text fontSize="sm" color="gray.500">
                {formatDate(comment.createdAt)} ago
              </Text>
              <Text fontSize="sm" mt={3} color="gray.700">
                {comment.content}
              </Text>
            </Box>
          </Flex>
        ))}
      </Box>
    </Stack>
  );
}
