import React from 'react';
import {
  Box,
  Center,
  Heading,
  Text,
  Divider,
  Stack,useTheme,Image
} from "@chakra-ui/react";


function AboutUs() {
    const theme = useTheme();
  return (
        <Box p={8}>
          <Center>
            <Heading as="h1" size="xl" mb={6}>
              About Our Company
            </Heading>
          </Center>
          <Divider />
          <Stack spacing={6} mt={6}>
            <Text fontSize="lg">
              Welcome to our IT company! We specialize in building innovative software solutions and web development applications that empower businesses to thrive in the digital world.
            </Text>
            <Text fontSize="lg">
              Our team of experienced developers and designers is dedicated to delivering high-quality, user-friendly products that meet the unique needs of our clients.
            </Text>
            <Text fontSize="lg">
              At our company, we believe in the power of technology to drive positive change. We are committed to staying at the forefront of industry trends and leveraging the latest tools and technologies to create cutting-edge solutions for our clients.
            </Text>
          </Stack>
          <Divider />
          <Center mt={8}>
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
   
          </Center>
          <Stack spacing={6} mt={6}>
            <Text fontSize="lg">
              In addition to our software and web development services, we are also passionate about fostering community engagement and collaboration.
            </Text>
            <Text fontSize="lg">
              That's why we've developed a community forum platform that allows corporators and citizens to interact with each other, share ideas, and discuss important issues affecting their community.
            </Text>
            <Text fontSize="lg">
              Our forum provides a space for open dialogue and collaboration, helping to strengthen connections between corporators and citizens and promote transparency and accountability in local governance.
            </Text>
            <Text fontSize="lg">
              We are excited about the potential of our community forum project to bring positive change to communities and empower citizens to have a voice in shaping their future.
            </Text>
          </Stack>
        </Box>
      );
 
}

export default AboutUs