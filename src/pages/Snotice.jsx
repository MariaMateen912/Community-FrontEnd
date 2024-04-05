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
  Select,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Snotice() {
  const theme = useTheme();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/auth/submit-notice",
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
        alert("Notice sent successfully");

      } else {
        // Handle registration failure
        alert("Notice failed. Please check your input.");
      }
    } catch (error) {
      console.error("An error occurred while submitting notice:", error);
      // Handle the error appropriately, e.g., show an error message to the user
      alert(
        "An error occurred while submitting notice. Please try again later."
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
          <Heading> Submit Notice</Heading>
        </Center>
      </Box>
      <Formik
        initialValues={{
            meetingDate :"",
        agenda: "",
          place: "",
          whom: "",
        }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
             <Field name="meetingDate">
    {({ field, form }) => (
      <FormControl mt={5} ml={450}> {/* Add margin and padding here */}
        <FormLabel htmlFor="meetingDate">Meeting Date</FormLabel> {/* Move htmlFor here */}
        {/* Date Picker Component */}
        <ReactDatePicker
          id="meetingDate"
          selected={field.value} // Assuming field.value contains the date value
          onChange={date => form.setFieldValue(field.name, date)} // Update field value on change
          style={{ marginTop: '8px' }} // Add margin top directly to ReactDatePicker
        />
      </FormControl>
    )}
  </Field>
            <Field name="agenda" >
              {({ field, form }) => (
                <FormControl mt={10} ml={450}>
                  <FormLabel>Agenda</FormLabel>
                  <Input {...field} 
                  maxWidth="300px"
                  placeholder="Enter your meeting's agenda" />
                  <FormErrorMessage>{form.errors.subject}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="place">
              {({ field, form }) => (
                <FormControl mt={5} ml={450}>
                  <FormLabel>Place of the meeting</FormLabel>
                  <Input
                    {...field}
                    width={{ base: "full", md: "400px" }}
                    placeholder="Enter the exact place"
                  />
                 
                </FormControl>
              )}
            </Field>
            

            <Field name="whom">
  {({ field, form }) => (
    <FormControl mt={5} ml={450}>
      <FormLabel>For Whom</FormLabel>
      <Input
        {...field}
        placeholder="Only the specified people should attend the meeting"
      />
      {/* Dropdown Component */}
      <Select
        mt={2} // Adjust margin top as needed
        value={field.value} // Assuming field.value contains the selected place
        onChange={e => form.setFieldValue(field.name, e.target.value)} // Update field value on change
      >
        <option value="">Select People Invloved</option>
        <option value="Chairman">Only Society Chairman</option>
        <option value="citizens">All citizens</option>
        {/* Add more options as needed */}
      </Select>
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

export default Snotice;
