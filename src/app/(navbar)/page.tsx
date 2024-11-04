"use client";

import React, { useCallback, useEffect, useState } from "react";
import PostCard from "@/components/post/PostCard";
import { SelectCommunity } from "@/components/SelectCommunity";
import { InputGroup } from "@/components/ui/input-group";
import { Box, Flex, Input, Stack } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { createPost, deletePost, ICreatePost, IPost } from "@/api-caller/post";
import { getPosts } from "@/api-caller/post";
import {
  CreatePostDialog,
  ICreatePostForm,
} from "@/components/post/CreatePostDialog";
import { debounceSearch } from "@/utils/debounceSearch";

export default function Dashboard() {
  const userId = localStorage.getItem("userId");
  const [posts, setPosts] = useState<IPost[]>([]);
  const [postSearch, setPostSearch] = useState({
    title: "",
    community: [],
  });

  const handleTitleChange = useCallback(
    debounceSearch((value: string) => {
      if (value.length >= 2 || value.length == 0) {
        setPostSearch((prev) => ({ ...prev, title: value }));
      }
    }, 500),
    []
  );

  const handleCommunityChange = (e: any) => {
    setPostSearch((prev) => ({ ...prev, community: e.value }));
  };

  const fetchPosts = () => {
    getPosts(postSearch).then((response) => {
      setPosts(response);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, [postSearch]);

  const onCreatePost = async (value: ICreatePostForm) => {
    const body: ICreatePost = {
      ...value,
      authorId: userId ?? "",
    };
    await createPost(body).then(() => {
      fetchPosts();
    });
  };

  const onDeletePost = async (postId: string) => {
    try {
      await deletePost(postId).then(() => {
        fetchPosts();
      });
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <>
      <Stack w={"5xl"} gap={4} p={4}>
        <Flex alignItems={"center"} gap={4} mb={4}>
          <InputGroup flex={1} startElement={<BiSearch />}>
            <Input
              color="black"
              placeholder="Search"
              className="border-white border rounded-md"
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </InputGroup>
          <SelectCommunity
            value={postSearch.community}
            onChange={handleCommunityChange}
          />
          <CreatePostDialog onCreate={onCreatePost} />
        </Flex>
        <Box w={"full"} justifyContent={"center"}>
          {posts.length > 0
            ? posts.map((post, index) => {
                return (
                  <PostCard
                    key={index}
                    post={post}
                    isFirst={index == 0}
                    onDelete={onDeletePost}
                  />
                );
              })
            : "No Post"}
        </Box>
      </Stack>
    </>
  );
}
