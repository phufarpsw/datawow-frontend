"use client";
import { Flex, Button, Text, Heading, useBreakpointValue } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import MenuDrawer from "./MenuDrawer";
import Link from "next/link";
import { Avatar } from "./ui/avatar";
import { useRouter } from "next/navigation";

interface NavigationBarProps {
  username: string;
}

export default function NavigationBar({ username }: NavigationBarProps) {
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const isMobile = useBreakpointValue({ base: true, md: true, lg: false });
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    router.push("/signin");
  };
  return (
    <>
      <Flex p={2.5} px={8} bg={bgColor} justify="space-between" align="center">
        <Link href="/">
          <Heading fontWeight={"semibold"}>a Board</Heading>
        </Link>
        {isMobile ? (
          <MenuDrawer />
        ) : username ? (
          <div className="flex items-center space-x-6">
            <Avatar variant="solid" name={username} />
            <Text>{username}</Text>
            <Button size="md" px={4} onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/signin">
            <Button size="md" px={6} bg="#49A569">
              Sign In
            </Button>
          </Link>
        )}
      </Flex>
    </>
  );
}
