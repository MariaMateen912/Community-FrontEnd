import React from 'react'
import Header from "/src/components/Header";

import {
  Box,
  Center,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  useTheme,  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,useDisclosure,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Citizen()  {
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const navigate = useNavigate();
  const handleCalendarButtonClick = () => {
    // Redirect to the Calendar page
    navigate('/citizen/calendar');
    // Close the drawer
    //onClose();
  };


  return (
    <>
      <Header />
      <Box>
        <Center mt={10} display="flex" flexDirection="column">
          <Heading> Welcome to the Community,</Heading>
          <Heading>Beautiful citizens of NIBM</Heading>   
          </Center>
      </Box>
      <Box> <Center>
      <Button
                  mt={10}
                  color={theme.colors.brand.white}
                  bg={theme.colors.brand.gradientGreen}
                  ref={btnRef}
                  type="submit"
                  onClick={onOpen}
                >
                 Dashboard
                </Button>
                </Center>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Dashboard</DrawerHeader>

          <DrawerBody>
          <Button
  mt={10}
  ml={10}
  color={theme.colors.brand.white}
  bg={theme.colors.brand.gradientGreen}
  type="submit"
  onClick={handleCalendarButtonClick}
>
  Calendar
</Button>

<Button
  mt={10}
  ml={10}
  color={theme.colors.brand.white}
  bg={theme.colors.brand.gradientGreen}
  type="submit"
>
  Time for Poll
</Button>

<Button
  mt={10}
  ml={10}
  color={theme.colors.brand.white}
  bg={theme.colors.brand.gradientGreen}
  type="submit"
>
  About Us
</Button>

<Button
  mt={10}
  ml={5}
  color={theme.colors.brand.white}
  bg={theme.colors.brand.gradientGreen}
  type="submit"
>
  Contact Corporator
</Button>

          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </Box>
      
    </>
  );
}


export default Citizen;