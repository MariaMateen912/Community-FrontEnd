import React from "react";
import Header from "../components/Header";
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
  Textarea,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
function Sgrivience() {
  const theme = useTheme();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/auth/submit-grievance",
        {
          ...values,

          // Pass the form values directly to the server
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlODhiNjkzMTJhZmI5NzA0ODhmZTdkIiwicm9sZSI6ImNpdGl6ZW4ifSwiaWF0IjoxNzEwNDk0ODA5fQ.aZ9X3mUEEqjCQRqSbAoWVDXMi8BIeOvFi9u5DEXJgas",
          },
        }
      );

      const json = response.data;
      console.log(json);
      console.log(json.success);

      if (json.success) {
        localStorage.setItem("token", json.authoken);
        alert("Complain registered successfully");

        // Redirect or handle success as needed
        // For example, you can use React Router to navigate to another page:
        // history.push("/");
      } else {
        // Handle registration failure
        alert("Registration failed. Please check your input.");
      }
    } catch (error) {
      console.error("An error occurred while submitting complain:", error);
      // Handle the error appropriately, e.g., show an error message to the user
      alert(
        "An error occurred while submitting complain. Please try again later."
      );
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
          <Heading> Grievance Form</Heading>
        </Center>
      </Box>
      <Formik
        initialValues={{
          subject: "",
          complain: "",
          suggestion: "",
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <Field name="subject">
              {({ field, form }) => (
                <FormControl>
                  <FormLabel>Subject</FormLabel>
                  <Input {...field} placeholder="Subject of your complain" />
                </FormControl>
              )}
            </Field>
            <Field name="complain">
              {({ field, form }) => (
                <FormControl>
                  <FormLabel>Your Complain</FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your complain in brief"
                  />
                </FormControl>
              )}
            </Field>
            <Field name="suggestion">
              {({ field, form }) => (
                <FormControl>
                  <FormLabel>Any suggestions</FormLabel>
                  <Input
                    {...field}
                    placeholder="Do you have any suggestion for your complain"
                  />
                </FormControl>
              )}
            </Field>

            <Button
              mt={10}
              ml={600}
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
    </>
  );
}

export default Sgrivience;
