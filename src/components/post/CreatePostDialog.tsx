"use client";

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
import { Heading, Input, Textarea } from "@chakra-ui/react";
import { PiPlus } from "react-icons/pi";
import { SelectCommunity } from "../SelectCommunity";
import { Field } from "../ui/field";
import { useForm } from "react-hook-form";

export interface ICreatePostForm {
  title: string;
  description: string;
  community: string;
}

interface CreatePostDialogProps {
  onCreate: (body: ICreatePostForm) => void;
}

export const CreatePostDialog = ({ onCreate }: CreatePostDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreatePostForm>();
  const userId = localStorage.getItem("userId") ?? "";
  const [community, setCommunity] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const onCommunityChange = (e: any) => {
    setCommunity(e.value);
  };

  const onOpenCreate = () => {
    if (userId) {
      setIsOpen(true);
    }else {
      alert('Please Login first')
    }
  };

  const onSubmit = (data: any) => {
    onCreate({ ...data, community: community[0] });
    reset({
      title: "",
      description: "",
    });
    setIsOpen(false);
    setCommunity([]);
  };

  return (
    <DialogRoot
      open={isOpen}
      placement={"center"}
      closeOnInteractOutside={false}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          px={5}
          bg="#49A569"
          onClick={onOpenCreate}
        >
          Create <PiPlus />
        </Button>
      </DialogTrigger>
      <DialogContent bg={"white"} color={"black"}>
        <DialogHeader fontSize={20}>
          <Heading fontWeight={"semibold"}>Create Post</Heading>
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
              placeholder="Title"
              borderColor={"green.500"}
              _focus={{ borderColor: "green.500" }}
            />
          </Field>
          <Field
            invalid={!!errors.description}
            errorText={errors.description?.message}
          >
            <Textarea
              p={4}
              {...register("description", {
                required: "Description is required",
              })}
              bg={"white"}
              color={"black"}
              placeholder="What's on your mind..."
              _focus={{ borderColor: "green.500" }}
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
            Post
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
