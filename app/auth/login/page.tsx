"use client";
import React, { useEffect, useState } from "react";
import { Form, Formik, FormikProvider, useFormik } from "formik";
import * as yup from "yup";

import {
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Container,
  InputGroup,
  InputRightElement,
  Button,
  AbsoluteCenter,
  Heading,
  Grid,
  Box,
  Center,
  VStack,
  Spinner,
} from "@chakra-ui/react";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .default("")
    .required("Email tidak boleh kosong")
    .email("Gunakan Format Email"),
  password: yup.string().default("").required("Passowrd tidak boleh kosong"),
});

type LoginValues = yup.Asserts<typeof loginSchema>;
const Login = () => {
  const [show, setShow] = useState<boolean>(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...loginSchema.getDefault(),
    },
    onSubmit: () => console.log("jalan"),
    validationSchema: loginSchema,
  });

  let { values, errors, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <section className="flex items-center justify-center h-full w-full">
      <Box w={{ base: "90%", sm: "90%", md: "80%", lg: "50%", xl: "30%" }}>
        <FormikProvider value={formik}>
          <Heading marginBottom={5} size={"lg"} color="#38A169">
            Login Form
          </Heading>
          <Form onSubmit={handleSubmit}>
            <VStack w="100%" spacing={5}>
              <FormControl isInvalid={!!errors?.email}>
                <FormLabel
                  color="#38A169"
                  htmlFor="email"
                  fontWeight="semibold"
                >
                  Email
                </FormLabel>
                <Input
                  id="email"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ketik email"
                />

                <FormErrorMessage color={"red"} fontWeight="bold">
                  {errors?.email}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors?.password}>
                <FormLabel
                  color="#38A169"
                  htmlFor="password"
                  fontWeight="semibold"
                >
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    className="w-full"
                    id="password"
                    type={show ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="************"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => {
                        setShow(!show);
                      }}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <FormErrorMessage size={"xs"} color={"red"} fontWeight="bold">
                  {errors?.password}
                </FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                width={"100%"}
                height={10}
                borderRadius={10}
                color={"white"}
                backgroundColor={"#38A169"}
              >
                Login
              </Button>
            </VStack>
          </Form>
        </FormikProvider>
      </Box>
    </section>
  );
};

export default Login;
