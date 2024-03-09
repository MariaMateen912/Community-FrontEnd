import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/authentication/Login";
import Registration from "./pages/authentication/Registration";
import Citizen from "./pages/Citizen";
import Calendar from "./pages/Calendar";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/citizen" element={<Citizen />} />
          <Route path="citizen/calendar" element={<Calendar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
