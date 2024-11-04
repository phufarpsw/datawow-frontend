// components/Layout.js
"use client";

import React, { useEffect, useState } from "react";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import NavigationBar from "@/components/NavigationBar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: true, lg: false });
  const username = localStorage.getItem("username") ?? "";

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
       setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="#BBC2C0">
      <NavigationBar username={username} />
      <Flex flex={1} gap={4} p={4}>
        {/* Sidebar Section */}
        {!isMobile && (
          <Box w="sm" h="full" p={4}>
            <p>Home</p>
            <p>Our Blog</p>
          </Box>
        )}

        {/* Main Content Section */}
        {children}
      </Flex>
    </Box>
  );
}
