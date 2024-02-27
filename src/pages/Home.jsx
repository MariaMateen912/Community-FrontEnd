import React from "react";
import Header from "../components/Header";
import {
  Heading,
  Box,
  Text,
  useTheme,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useModalContext,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import homeImage from "../assets/home.jpg";

function Home() {
  const { isOpen: isCorporatorModalOpen, onOpen: onCorporatorModalOpen, onClose: onCorporatorModalClose } = useDisclosure();
  const { isOpen: isCitizenModalOpen, onOpen: onCitizenModalOpen, onClose: onCitizenModalClose } = useDisclosure();
  const theme = useTheme();
  const navigate = useNavigate();

   const navLogin = () => { 

navigate("/login");


    };
    
    const navReg = (value) => { 

      navigate("/registration");
      
      localStorage.setItem('role', value);
          };

  return (
    <>
      <Header />
      <Box m={10} display="flex" flexDirection="row">
        <Box>
          <Heading>What is Community Forum?</Heading>
          <Text color={theme.colors.brand.gray}>
            Local Community Forums are public online community gathering places
            where you exchange community information and discuss local issues
            that matter to you.
          </Text>
          <Text mt={5} color={theme.colors.brand.gray}>
            <Text color={theme.colors.brand.gray}>
              Local Community Forums are public online community gathering
              places where you exchange community information and discuss local
              issues that matter to you.
            </Text>
          </Text>
          <Box display="flex" flexDirection="row" mt={10}>
            <Button
              onClick={onCorporatorModalOpen}
              bg={theme.colors.brand.gradientGreen}
              color={theme.colors.brand.white}
              ml={5}
            >
              Corporator
            </Button>
            <Modal isOpen={isCorporatorModalOpen} onClose={onCorporatorModalClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Click the button to  Register or Login</ModalHeader>
                <ModalCloseButton />
                <ModalBody display="flex" justifyContent="center" p={10}>
                  <Button 
                  onClick={navLogin}
                    bg={theme.colors.brand.gradientGreen}
                    color={theme.colors.brand.white}
                    ml={5}
                  >
                    Login
                  </Button>
                  <Button
                  onClick={() => navReg("corporator")}
                    bg={theme.colors.brand.gradientGreen}
                    color={theme.colors.brand.white}
                    ml={5}
                  >
                    Register
                  </Button>
                </ModalBody>
              </ModalContent>
            </Modal>

            <Button
              onClick={onCitizenModalOpen}
              bg={theme.colors.brand.gradientGreen}
              color={theme.colors.brand.white}
              ml={5}
            >
              Citizen
            </Button>
            <Modal isOpen={isCitizenModalOpen} onClose={onCitizenModalClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Click the button to Register or Login</ModalHeader>
                <ModalCloseButton />
                <ModalBody display="flex" justifyContent="center" p={10}>
                  {/* Add your registration button here */}
                  <Button
                  onClick={() => navReg("citizen")}
                    bg={theme.colors.brand.gradientGreen}
                    color={theme.colors.brand.white}
                    ml={5}
                  >
                    Register
                  </Button>
                  {/* Add your login button here */}
                  <Button
                  onClick={navLogin}
                    bg={theme.colors.brand.gradientGreen}
                    color={theme.colors.brand.white}
                    ml={5}
                  >
                    Login
                  </Button>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
        <Box>
          <Image src={homeImage} alt="Dan Abramov" />
        </Box>
      </Box>
      <Box>
        <Heading ml={10}>Location: NIBM, PargeNagar</Heading>
        <Text p={10} color={theme.colors.brand.gray}>
          NIBM Road is a 3.5Km long stretch on the southern side of Pune, the main growth driver of NIBM road is its easy approach to Hadapsar and infrastructure facilities. This stretch connects several localities like Koregaon Park, Swargate, Kharadi, and Kondhwa. Furthermore, B. U. Bhandari Group, Kolte Patil Developers, K Raheja Corp, ARV Group, and VTP Realty are some of the well-known builders in this area. NIBM Road provides a plethora of housing options which include residential plots, multi-storey apartments, and independent houses.
        </Text>
      </Box>
    </>
  );
}

export default Home;
