import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import LoginPage from "../Assets/LoginLogo.svg";
import { useDispatch } from "react-redux/";
import { LoginAction } from "../Reducer/AuthReducer/action";
import { LOGIN_SUCCESS } from "../Reducer/AuthReducer/actionType";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const toast = useToast();
  // Dispatch and Location Variable Creation
  const dispatch = useDispatch();

  //   Password show hide useState
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  // Catching Data in variable
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //   Handleing Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      if (email === "eve.holt@reqres.in" && password === "cityslicka") {
        dispatch(LoginAction({ email, password })).then((r) => {
          if (r.type === LOGIN_SUCCESS) {
            toast({
              title: "Login Success",
              status: "success",
              duration: 1000,
              isClosable: true,
            });
            navigate("/");
          }
        });
      } else {
        toast({
          title: "Invalid Credentials.",
          description: "Please Check E-Mail & Password",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box display={"flex"} flexDirection="column" alignItems={"center"}>
      <Image width={{ xs: "50px", lg: "180px" }} my="2.5rem" src={LoginPage} />
      <form onSubmit={handleSubmit}>
        <VStack direction={["column", "row"]}>
          <Box my="1rem">
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                width={["250px", "sm", "md"]}
                placeholder="Email address"
                type="email"
                variant="filled"
              />
            </FormControl>
          </Box>
          <Box my="1rem">
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Text
                my="0.5rem"
                fontSize="xs"
                textDecoration={"underline"}
                textColor="#0091ae"
                cursor={"pointer"}
                onClick={handleClick}
              >
                {show ? "Hide Password" : "Show Password"}
              </Text>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                //   size={"lg"}
                width={["250px", "sm", "md"]}
                placeholder="Password"
                type={show ? "text" : "password"}
                variant="filled"
              />
            </FormControl>
          </Box>
          <Box py="0.5rem">
            <FormControl isRequired>
              <Checkbox size={"lg"}>Remember me</Checkbox>
            </FormControl>
          </Box>
          <Box py="0.5rem">
            <Button
              width={[100, "xs", "sm", "md"]}
              bgColor="orange"
              color="white"
              _hover={{ background: "darkOrange", color: "white" }}
              disabled={email === "" || password === ""}
              type="submit"
            >
              Log in
            </Button>
          </Box>
        </VStack>
      </form>
      <Stack display={"flex"} mt="7rem" alignContent={"center"}>
        <Text fontSize={["xs", "sm", "md"]}>
          ©2022 HubSpot, Inc. All Rights Reserved.
        </Text>
        <a
          href="https://legal.hubspot.com/privacy-policy"
          target="_blannk"
          style={{
            fontSize: "14px",
            textAlign: "center",
            color: "darkcyan",
            fontWeight: "600",
          }}
        >
          Privacy Policy
        </a>
      </Stack>
    </Box>
  );
};

export default Login;
