// components/Layout.js
"use client";

import React, { useEffect, useState } from "react";
import { Box, Text, Flex, useBreakpointValue } from "@chakra-ui/react";
import NavigationBar from "@/components/NavigationBar";
import { FaHouseChimney } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [user, setUser] = useState({
    id: "",
    username: "",
  });
  const isMobile = useBreakpointValue({ base: true, md: true, lg: false });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const username = localStorage.getItem("username") ?? "";
      setUser({ id: userId, username });
    } else {
    }
  }, []);

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="#BBC2C0">
      <NavigationBar username={user.username} />
      <Flex flex={1}>
        {/* Sidebar Section */}
        {!isMobile && (
          <Flex p={6} w="sm" h="full" alignItems={"start"} direction={"column"}>
            <Link href="/">
              <Button spaceX={4}>
                <FaHouseChimney />
                <Text>Home</Text>
              </Button>
            </Link>
            <Link href="/myblog">
              <Button spaceX={4}>
                <FiEdit />
                <Text>Our Blog</Text>
              </Button>
            </Link>
          </Flex>
        )}

        {/* Main Content Section */}
        {children}
      </Flex>
    </Box>
  );
}
