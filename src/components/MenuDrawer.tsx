"use client";
import React, { useState } from "react";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
} from "@/components/ui/drawer";
import { Button, IconButton, Stack, Text } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { FaHouseChimney } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
export default function MenuDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  return (
    <>
      <IconButton
        aria-label="Open Menu"
        onClick={() => {
          setIsOpen(true);
        }}
        size="md"
        colorScheme="blue"
      >
        <RxHamburgerMenu />
      </IconButton>
      <DrawerRoot open={isOpen} onOpenChange={onClose}>
        <DrawerBackdrop />
        <DrawerContent bg={"#243831"}>
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <Stack>
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
            </Stack>
          </DrawerBody>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </>
  );
}
