import React from "react";
import { Box, useTheme, Heading, Text } from "@chakra-ui/react";
function Header() {
  const theme = useTheme();
  return (
    <Box
      boxShadow="md"
      backgroundColor="white"
      display="flex"
      flexDirection="row"
      w="100%"
      p={4}
    >
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
  );
}

export default Header;
