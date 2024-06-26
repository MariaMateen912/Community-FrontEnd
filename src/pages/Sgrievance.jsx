import React, { useEffect, useState } from "react";
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
  Textarea,Radio,
  RadioGroup,
  Stack,
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
          location: location,

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
  const [location, setLocation] = useState('nibmRd');

  // Validation function for checking character length
  const validateLength = (value) => {
    let error;
    if (value && value.length > 15) { // Change 100 to your desired character limit
      error = "Maximum character limit exceeded";
    }
    return error;
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
          location:"nibmRd",
          subject: "",
          complain: "",
          suggestion: "",
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
             <Field name="location">
              {({ field, form }) => (
               <FormControl mt={5} ml={450}>
               <FormLabel>Location</FormLabel>
               <RadioGroup value={location} onChange={(value) => setLocation(value)}>

                 <Stack spacing={4} direction='row'>
                   <Radio value="nibmRd">NIBM Rd</Radio>
                   <Radio value="kausarBaug">Kausar Baug</Radio>
                   <Radio value="pargeNagar">Parge Nagar</Radio>
                 </Stack>
               </RadioGroup>
             </FormControl>
              )}
            </Field>
            <Field name="subject" validate={validateLength}>
              {({ field, form }) => (
                <FormControl mt={10} ml={450}>
                  <FormLabel>Subject</FormLabel>
                  <Input {...field} 
                  maxWidth="300px"
                  placeholder="Subject of your complain" />
                  <FormErrorMessage>{form.errors.subject}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="complain">
              {({ field, form }) => (
                <FormControl mt={5} ml={450}>
                  <FormLabel>Your Complain</FormLabel>
                  <Input
                    {...field}
                    width={{ base: "full", md: "400px" }}
                    placeholder="Enter your complain in brief"
                  />
                 
                </FormControl>
              )}
            </Field>
            <Field name="suggestion" >
              {({ field, form }) => (
                <FormControl mt={5} ml={450}>
                  <FormLabel>Any suggestions</FormLabel>
                  <Input
                    {...field}
                    width={{ base: "full", md: "400px" }}
                    placeholder="Do you have any suggestion for your complain"
                  />
                </FormControl>
              )}
            </Field>

            <Button
              mt={20}
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
