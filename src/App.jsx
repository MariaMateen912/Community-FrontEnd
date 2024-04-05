import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/authentication/Login";
import Registration from "./pages/authentication/Registration";
import Citizen from "./pages/Citizen";
import Calendar from "./pages/Calendar";
import Corporator from "./pages/Corporator";
import Sgrievance from "./pages/Sgrievance";
import Vgrievance from "./pages/Vgrievance";
import Snotice from "./pages/Snotice";
import AboutUs from "./pages/AboutUs";
import MeetingAttendancePage from "./pages/MeetingAttendancePage";
import ImageUpload from "./pages/ImageUpload";





function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/citizen" element={<Citizen />} />
          <Route path="/citizen/calendar" element={<Calendar />} />
          <Route path="/citizen/sgrievance" element={<Sgrievance />} />   
          <Route path="/citizen/aboutus" element={<AboutUs />} />     
          <Route path="/citizen/imageupload" element={<ImageUpload />} />
          <Route path="/corporator" element={<Corporator />} />
          <Route path="/corporator/calendar" element={<Calendar />} />
          <Route path="/corporator/vgrievance" element={<Vgrievance />} />
          <Route path="/corporator/snotice" element={<Snotice />} />
          <Route path="/corporator/aboutus" element={<AboutUs />} />
          <Route path="/corporator/meetingattendancepage" element={<MeetingAttendancePage />} />
         

        </Routes>
      </Router>
    </div>
  );
}

export default App;
