import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Text } from '@chakra-ui/react';

function MeetingAttendancePage({ meetingId }) {
  const [attendanceData, setAttendanceData] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/attendance/${meetingId}`);
        setAttendanceData(response.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, [meetingId]);

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Attendance Statistics for Meeting ID: {meetingId}
      </Heading>
      {attendanceData ? (
        <Box>
          <Text>Number of attendees selecting Attending: {attendanceData.attendingCount}</Text>
          <Text>Number of attendees selecting Not Attending: {attendanceData.notAttendingCount}</Text>
        </Box>
      ) : (
        <Text>Loading attendance data...</Text>
      )}
    </Box>
  );
}

export default MeetingAttendancePage;
