import React, { useState, useEffect } from 'react';
import Header from "/src/components/Header";

import {
  Box,
  Center,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
import ImageSlider from '../components/ImageSlider';


function Corporator()  {
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const navigate = useNavigate();

  const handleCalendarButtonClick = () => {
    // Redirect to the Calendar page
    navigate('/corporator/calendar');
  };
  
const handleVgrivienceButtonClick =() => {
  navigate('/corporator/vgrievance');
}

const handleSnoticeButtonClick =() => {
  navigate('/corporator/snotice');
}
const handleMeetingAttendancePageButtonClick =() => {
  navigate('/corporator/meetingattendancepage');
}
const handleAboutUsButtonClick =() => {
  navigate('/corporator/aboutus');
}

const [notices, setNotices] = useState([]);

  
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/notices');
        const { notices } = response.data;
        setNotices(notices);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };
  
    fetchNotices();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/auth/delete-notice/${id}`);

      
      setNotices(notices.filter(notice => notice._id !== id));
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };
  
  return (
    <>
      <Header />
      <Box>
        <Center mt={10} display="flex" flexDirection="column">
          <Heading> Welcome to the Community,</Heading>
          <Heading>Corporator of NIBM</Heading>   
          </Center>
      </Box>
      <Box> <Center>
      <Button
                  mt={10}
                  mb={10}
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
 onClick={handleSnoticeButtonClick}
>
  Submit Notice
</Button>
<Button
  mt={10}
  ml={10}
  color={theme.colors.brand.white}
  bg={theme.colors.brand.gradientGreen}
  type="submit"
 onClick={handleMeetingAttendancePageButtonClick}
>
  Meeting Attendance page
</Button>

<Button
  mt={10}
  ml={10}
  color={theme.colors.brand.white}
  bg={theme.colors.brand.gradientGreen}
  type="submit"
  onClick={handleAboutUsButtonClick}
>
  About Us
</Button>

<Button
  mt={10}
  ml={5}
  color={theme.colors.brand.white}
  bg={theme.colors.brand.gradientGreen}
  type="submit"
  onClick={handleVgrivienceButtonClick}
>
  View Grievances
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
     
      <ImageSlider />

      <Box>
  <Heading as="h2" size="lg" mb={4}>
    Notices
  </Heading>
  
    <Table variant="striped" colorScheme="gray">
      <Thead>
        <Tr>
          <Th>Meeting Date</Th>
          <Th>Agenda</Th>
          <Th>Place</Th>
          <Th>Whom</Th>
        </Tr>
      </Thead>
      <Tbody>
        {notices.map((notice ,index) => (
          <Tr key={index}>
            <Td>{notice.meetingDate}</Td>
            <Td>{notice.agenda}</Td>
            <Td>{notice.place}</Td>
            <Td>{notice.whom}</Td>
            <Td>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(notice._id)}
                >
                  Delete
                </Button>
                </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
 
</Box>
       
       
    </>
  );
}


export default Corporator;