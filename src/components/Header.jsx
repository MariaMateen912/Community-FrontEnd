import React from "react";
import { Box, useTheme, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  const back = () => {
    navigate(-1);
  };

  const home = () => {
    navigate("/");
  };

  return (
    <Box
      boxShadow="md"
      backgroundColor="white"
      display="flex"
      flexDirection="row"
      justifyContent="space-between" // Change to space-between
      alignItems="center"
      w="100%"
      p={4}
    >
      <Box display="flex" flexDirection="row" justifyContent="left">
        <Text fontSize={20} color={theme.colors.brand.orange} fontWeight={600}>
          Local
        </Text>

        <Text fontSize={20} color={theme.colors.brand.grey} fontWeight={600}>
          Community
        </Text>

        <Text fontSize={20} color={theme.colors.brand.green} fontWeight={600}>
          Forum{" "}
        </Text>
      </Box>

      {!isHome && (
        <Flex>
          <Button onClick={back} colorScheme="blue" variant="outline" mr={2}>
            Back
          </Button>
          <Button onClick={home} colorScheme="blue" variant="outline">
            Logout
          </Button>
        </Flex>
      )}
    </Box>
  );
}

export default Header;
