"use client";
import {
  Box,
  Button,
  VStack,
  Text,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";
import BoardImg from "@/assets/board.png";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Field } from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { ILogin, login } from "@/api-caller/auth";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const router = useRouter();
  const onSubmit = handleSubmit((data) => {
    login(data).then((response) => {
      localStorage.setItem("userId", response.id);
      localStorage.setItem("username", response.username);
      router.push("/");
    });
  });
  const isMobile = useBreakpointValue({ base: true, md: true, lg: false });

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      bg={"#243831"}
    >
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="#2B5F44"
        padding={8}
        order={isMobile ? 1 : 2}
        className=" rounded-tl-[36px] rounded-bl-[36px]"
      >
        <VStack align="center">
          <Image src={BoardImg} alt="Board Image" />
          <Text color="white" fontSize="xl" fontStyle="italic">
            a Board
          </Text>
        </VStack>
      </Box>

      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="#243831"
        padding={8}
        order={isMobile ? 2 : 1}
      >
        <form
          onSubmit={onSubmit}
          className="w-full flex flex-col max-w-md float-left"
        >
          <Text fontSize="2xl" color="white" mb={4}>
            Sign in
          </Text>
          <Field
            label="First name"
            invalid={!!errors.username}
            errorText={errors.username?.message}
          >
            <Input
              pl={4}
              mb={3}
              bg={"white"}
              color={"black"}
              placeholder="Username"
              _focus={{ borderColor: "green.500" }}
              {...register("username", { required: "Username is required" })}
            />
          </Field>
          <Button
            type="submit"
            width="full"
            bg="#49A569"
            _hover={{ bg: "green.600" }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Box>
  );
}
