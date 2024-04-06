import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import {
  Box,
  useTheme,
  Center,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Input,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import axios from "axios";

function Registration() {
  const theme = useTheme();
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let localRole = localStorage.getItem("role");
    setRole(localRole);
  }, []);

  function validatefirstName(value) {
    let error;
    if (!value) {
      error = "First Name is required";
    }

    return error;
  }

  function validatelastName(value) {
    let error;
    if (!value) {
      error = "Last Name is required";
    }

    return error;
  }

  function validateemailId(value) {
    let error;
    if (!value) {
      error = "Email Id is required";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email address";
    }

    return error;
  }

  function validatemobileNo(value) {
    let error;

    if (!value) {
      error = "Mobile number is required";
    } else if (!/^\d{12}$/.test(value)) {
      // Check if the mobile number has the format '91' followed by 10 digits
      error = "Enter a valid 10-digit mobile number starting with '91'";
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

  function validateVoterId(value) {
    let error;
    const validVoterIds = new Set([
      "EAX2124325",
      "GDN0225185",
      "UTC026351",
      "HYUI76543",
      "KHBGFD378",
    ]); // Add your valid voterIds here

    if (!value) {
      error = "Voter ID is required";
    } else if (!validVoterIds.has(value)) {
      error = "Invalid Voter ID";
    }

    return error;
  }

  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    voterId: "",
    mobileNo: "",
    password: "",
  });
  const { firstName, lastName, emailId, voterId, mobileNo, password } =
    credentials;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          ...values,
          role,

          // Pass the form values directly to the server
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = response.data;
      console.log(json);
      console.log(json.success);

      if (json.success) {
        localStorage.setItem("token", json.authoken);
        alert("Registration successful");
        navigate("/login");
        // Redirect or handle success as needed
        // For example, you can use React Router to navigate to another page:
        // history.push("/");
      } else {
        // Handle registration failure
        alert("Registration failed. Please check your input.");
      }
    } catch (error) {
      console.error("An error occurred while registering:", error);
      // Handle the error appropriately, e.g., show an error message to the user
      alert("An error occurred while registering. Please try again later.");
    } finally {
      // Set submitting to false after the form submission is complete
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <Box>
        <Center mt={10} display="flex" flexDirection="column">
          <Heading> Registration form for {role}</Heading>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              emailId: "",
              voterId: "",
              mobileNo: "",
              password: "",
            }}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form>
                <Field name="firstName" validate={validatefirstName}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.firstName && form.touched.firstName
                      }
                    >
                      <FormLabel>First Name</FormLabel>
                      <Input
                        {...field}
                        placeholder="First Name"
                        onChange={field.onChange}
                      />
                      <FormErrorMessage>
                        {form.errors.firstName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="lastName" validate={validatelastName}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.lastName && form.touched.lastName}
                    >
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        {...field}
                        placeholder="Last Name"
                        onChange={field.onChange}
                      />
                      <FormErrorMessage>
                        {form.errors.lastName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="emailId" validate={validateemailId}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.emailId && form.touched.emailId}
                    >
                      <FormLabel>Email Id</FormLabel>
                      <Input
                        {...field}
                        placeholder="abc@xyz.com"
                        onChange={field.onChange}
                      />
                      <FormErrorMessage>{form.errors.emailId}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="voterId" validate={validateVoterId}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.voterId && form.touched.voterId}
                    >
                      <FormLabel>Voter ID</FormLabel>
                      <Input
                        {...field}
                        placeholder="Voter ID"
                        onChange={field.onChange}
                      />
                      <FormErrorMessage>{form.errors.voterId}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="mobileNo" validate={validatemobileNo}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.mobileNo && form.touched.mobileNo}
                    >
                      <FormLabel>Mobile Number</FormLabel>
                      <Input
                        {...field}
                        placeholder="+91.........."
                        onChange={field.onChange}
                      />
                      <FormErrorMessage>
                        {form.errors.mobileNo}
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

export default Registration;
