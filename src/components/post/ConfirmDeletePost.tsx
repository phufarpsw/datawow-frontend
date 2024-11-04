import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Heading } from "@chakra-ui/react";

interface ConfirmDeletePostProps {
  postId: string;
  children: React.ReactNode;
  onSuccess?: () => void;
  onDelete: (postId: string) => void;
}

export const ConfirmDeletePost = ({
  postId,
  children,
  onSuccess,
  onDelete,
}: ConfirmDeletePostProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDeletePost = async () => {
    setLoading(true);
    try {
      await onDelete(postId);
      if (onSuccess) {
        onSuccess();
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogRoot open={isOpen} placement={"center"} role="alertdialog">
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent bg={"white"} color={"black"}>
        <DialogHeader fontSize={20}>
          <Heading fontWeight={"semibold"}>
            Please confirm if you wish to delete the post?
          </Heading>
        </DialogHeader>
        <DialogBody>
          Are you sure you want to delete the post? Once deleted, it cannot be
          recovered.
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              variant="outline"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            px={4}
            color={"white"}
            bg="#F23536"
            onClick={onDeletePost}
            loading={loading}
            loadingText="Deleting..."
          >
            Delete
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};