import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,Button,
} from '@chakra-ui/react';
import axios from 'axios';
function Vgrievance() {
    const [grievances, setGrievances] = useState([]);

    useEffect(() => {
      const fetchGrievances = async () => {
        try {
          const response = await axios.get(
            'http://localhost:3000/api/grievance/get-grievances'
          );
          const { grievances } = response.data;
          setGrievances(grievances);
        } catch (error) {
          console.error('Error fetching grievances:', error);
        }
      };
  
      fetchGrievances();
    }, []);
  

    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/api/grievance/delete-grievance/${id}`);
        setGrievances(grievances.filter((grievance) => grievance._id !== id));
      } catch (error) {
        console.error('Error deleting grievance:', error);
      }
    };

  return (
    <Box>
    <Table variant="striped" colorScheme="teal">
      <TableCaption>Registered Grievances</TableCaption>
      <Thead>
        <Tr>
          <Th>Location</Th>
          <Th>Subject</Th>
          <Th>Complain</Th>
          <Th>Suggestion</Th>
        </Tr>
      </Thead>
      <Tbody>
        {grievances.map((grievance, index) => (
          <Tr key={index}>
            <Td>{grievance.location}</Td>
            <Td>{grievance.subject}</Td>
            <Td>{grievance.complain}</Td>
            <Td>{grievance.suggestion}</Td>
            <Td>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(grievance._id)}
                >
                  Delete
                </Button>
                </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
);
}
  
export default Vgrievance;