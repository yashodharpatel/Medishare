import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostMedicine from "./pages/PostMedicine";
import GetMedicine from "./pages/GetMedicine";
import UserLandingPage from "./pages/UserLandingPage";
import Login from "./pages/Login";
import OCR from "./components/OCR";
import Medicine from "./pages/Medicine";
import Diabetes from "./components/Diabetes";
import FindMedicine from "./components/FindMedicine";
import Volunteer from "./pages/Volunteer";
import Rewards from "./pages/Rewards";
import Consult from "./pages/Consult";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App font-ourfont overflow-x-hidden">
      <Router>
        <Routes>
          <Route path="/medicine/:id" element={<Medicine />} />
          <Route
            path="/fetchallmedicinengo"
            element={<GetMedicine org="Ngo" />}
          />
          <Route
            path="/fetchallmedicineuser"
            element={<GetMedicine org="User" />}
          />
          <Route path="/clienthome" element={<UserLandingPage />} />
          <Route path="/postmedicine" element={<PostMedicine />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ocr" element={<OCR />} />
          <Route path="/predict" element={<Diabetes />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/find-medicine" element={<FindMedicine />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/consult" element={<Consult />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
