import React, { useState } from "react";
import Header from "../../components/Header";
import {
  Box,
  Center,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  useTheme,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Login() {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    emailId: "", 
    password: "",
  });

  const theme = useTheme();

  function validateUsername(value) {
    let error;
    if (!value) {
      error = "Username is required";
    }
    return error;
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = "Password is required";
    }
    return error;
  }

  const handleSubmit = async (values) => {
    
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
         ...values
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);
      if (response.data.role == "citizen") {
        navigate('/citizen')

      }
      else if (response.data.role == "corporator") {
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <>
      <Header />

      <Box>
        <Center mt={10} display="flex" flexDirection="column">
          <Heading> Login form</Heading>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form>
                <Field name="username" validate={validateUsername}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.username && form.touched.username}
                    >
                      <FormLabel>Username</FormLabel>
                      <Input {...field} placeholder="username" onChange={field.onChange} />
                      <FormErrorMessage>
                        {form.errors.username}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password" validate={validatePassword}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel>Password</FormLabel>
                      <Input
                        {...field}
                        placeholder="password"
                        type="password"
                        onChange={field.onChange}
                      />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button
                  mt={4}
                  color={theme.colors.brand.white}
                  bg={theme.colors.brand.gradientGreen}
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Center>
      </Box>
    </>
  );
}

export default Login;
