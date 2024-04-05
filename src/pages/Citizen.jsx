import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "/src/components/Header";
import {
  Box,
  Center,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Radio,
  useTheme,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Text,
  ButtonGroup,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";

function Citizen() {
  const theme = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [notices, setNotices] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/notices"
        );
        const { notices } = response.data;
        const attendanceObj = {};
        notices.forEach((notice) => {
          attendanceObj[notice._id] = notice.attendance || "Not Attending";
        });
        setAttendance(attendanceObj);
        setNotices(notices);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, []);

  const handleAttendanceChange = (noticeId, value) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [noticeId]: value,
    }));
  };

  const handleSaveAttendance = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/saveAttendance", {
        attendance,
      });
      alert("Attendance saved successfully");
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  };

  const navigate = useNavigate();
  const handleCalendarButtonClick = () => {
    navigate("/citizen/calendar");
  };

  const handleSgrivienceButtonClick = () => {
    navigate("/citizen/sgrievance");
  };

  const handleAboutUsButtonClick = () => {
    navigate("/citizen/aboutus");
  };
  const handleImageUploadButtonClick = () => {
    navigate("/citizen/imageupload");
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
      <Box>
        <Center>
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
          placement="right"
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
                onClick={handleImageUploadButtonClick}
              >
               Demo
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
                onClick={handleSgrivienceButtonClick}
              >
                Grivience Section
              </Button>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
      <Box>
        <ImageSlider />
        <Card maxW="sm" mt={10} ml={475}>
          <CardBody>
            <Image
              src="https://previews.123rf.com/images/f1digitals/f1digitals1905/f1digitals190500085/123808741-vector-cartoon-illustration-of-indian-politician-greet-hand-isolated-on-white-background.jpg"
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">Mr.Corporator</Heading>
              <Text>
                Mr.Corporator is the most educated and experienced candidate in
                the whole of the state. He owns a PHD Degree in economics and is
                elected twice as the corporator of your area.
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Heading size="md">Ways to Contact Your Corporator</Heading>
            <br />
            <Text>
              1.EmailID: cor.gmail.com 2.Phone Number: 9187654321 3.Office :
              Nibm road
            </Text>
          </CardFooter>
        </Card>
      </Box>
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
              <Th>Attendance</Th>
            </Tr>
          </Thead>
          <Tbody>
            {notices.map((notice, index) => (
              <Tr key={index}>
                <Td>{notice.meetingDate}</Td>
                <Td>{notice.agenda}</Td>
                <Td>{notice.place}</Td>
                <Td>{notice.whom}</Td>
                <Td>
                  <Radio
                    value="Attending"
                    isChecked={attendance[notice._id] === "Attending"}
                    onChange={() =>
                      handleAttendanceChange(notice._id, "Attending")
                    }
                  >
                    Attending
                  </Radio>
                  <Radio
                    value="Not Attending"
                    isChecked={attendance[notice._id] === "Not Attending"}
                    onChange={() =>
                      handleAttendanceChange(notice._id, "Not Attending")
                    }
                  >
                    Not Attending
                  </Radio>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button mt={10}  ml={600} colorScheme="blue" onClick={handleSaveAttendance}>
          Save Attendance
        </Button>
      </Box>
    </>
  );
}

export default Citizen;
