"use client";

import { useEffect, useState } from "react";
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
import { Heading, IconButton, Input, Textarea } from "@chakra-ui/react";
import { SelectCommunity } from "../SelectCommunity";
import { Field } from "../ui/field";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { IPost, IUpdatePost } from "@/api-caller/post";

interface UpdatePostDialogProps {
  post: IPost;
  onUpdate: (body: IUpdatePost) => void;
}

export const UpdatePostDialog = ({ post, onUpdate }: UpdatePostDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdatePost>({
    defaultValues: post,
  });

  const userId = localStorage.getItem("userId") ?? "";
  const [community, setCommunity] = useState<string[]>([post.community]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    reset(post);
    setCommunity([post.community]);
  }, [post, reset]);

  const onCommunityChange = (e: any) => {
    setCommunity(e.value);
  };

  const onOpenUpdate = () => {
    if (userId) {
      setIsOpen(true);
    } else {
      alert("Please Login first");
    }
  };

  const onSubmit = (data: any) => {
    onUpdate({ ...data, community: community[0] });
    setIsOpen(false);
  };

  return (
    <DialogRoot
      open={isOpen}
      placement={"center"}
      closeOnInteractOutside={false}
    >
      <DialogTrigger asChild>
        <IconButton
          aria-label="Edit Post"
          rounded="full"
          onClick={onOpenUpdate}
        >
          <CiEdit size={24} />
        </IconButton>
      </DialogTrigger>
      <DialogContent bg={"white"} color={"black"}>
        <DialogHeader fontSize={20}>
          <Heading fontWeight={"semibold"}>Update Post</Heading>
        </DialogHeader>
        <DialogBody>
          <SelectCommunity value={community} onChange={onCommunityChange} />
          <Field invalid={!!errors.title} errorText={errors.title?.message}>
            <Input
              {...register("title", { required: "Title is required" })}
              pl={4}
              mb={3}
              bg={"white"}
              color={"black"}
              border="1px solid #ccc"
              placeholder="Title"
            />
          </Field>
          <Field
            invalid={!!errors.description}
            errorText={errors.description?.message}
          >
            <Textarea
              p={4}
              h={"3xs"}
              {...register("description", {
                required: "Description is required",
              })}
              bg={"white"}
              color={"black"}
              border="1px solid #ccc"
              placeholder="What's on your mind..."
            />
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            bg={"#49A569"}
            color="white"
            px={4}
            onClick={handleSubmit(onSubmit)}
          >
            Save Changes
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
