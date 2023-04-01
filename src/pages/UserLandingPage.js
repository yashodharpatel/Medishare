import React from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Want from "../assets/Want.gif";
import Donate from "../assets/Donate.gif";
import Doctor from "../assets/doctor.gif";
import Search from "../assets/Search.gif";
import bg from "../assets/bg.jpg";
import { useNavigate } from "react-router-dom";

const UserLandingPage = () => {
  const navigate = useNavigate();

  const handle1 = () => {
    navigate("/fetchallmedicineuser");
  };
  const handle2 = () => {
    navigate("/postmedicine");
  };
  const handle3 = () => {
    navigate("/rewards");
  };

  return (
    <div>
      <Navbar />
      <div className="px-16 pb-12 bg-gradient-to-r from-primary-dark to-primary-light flex flex-col justify-center items-center py-8 gap-3">
        <div className="flex justify-center items-center gap-3">
          <div
            className=" justify-center items-center flex flex-col bg-white rounded-3xl w-2/4 h-96" 
            onClick={handle1}
          >
            <img src={Want} alt="img" className="w-48" />
            <Card
              heading="Want Medicine?"
              description="Medication plays a vital role in the prevention and treatment of various diseases and conditions. By working with healthcare providers and following a comprehensive treatment plan, individuals can effectively manage their illnesses and improve their quality of life."
            />
          </div>

          <div
            className="flex flex-col justify-center items-center bg-white rounded-3xl w-2/4 h-96"
            onClick={handle2}
          >
            <img src={Donate} alt="img" className="w-48" />
            <Card
              heading="Donate Medicine?"
              description="Donating medicine is a simple yet effective way to make a positive impact on the world. By donating medication, you can help improve the lives of those in need and promote access to healthcare for all."
            />
          </div>
        </div>
        <div className="flex justify-center items-center gap-3 ">
          <div
            className=" flex flex-col justify-center items-center bg-white rounded-3xl w-2/4 h-96"
            onClick={handle3}
          >
            <img src={Search} alt="img" className="w-48" />
            <Card
              heading="Claim Rewards?"
              description="Claiming rewards is a positive experience that can help individuals stay motivated and inspired. By setting goals and working towards them, individuals can experience the sense of pride and fulfillment that comes with claiming a reward."
            />
          </div>

          <a
            href="/consult"
            className=" flex flex-col justify-center items-center bg-white rounded-3xl w-2/4 h-96 hover:shadow-primary-sd"
          >
            <img src={Doctor} alt="img" className="w-48" />
            <Card
              heading="Need Consultation?"
              description="Consulting a doctor is a crucial aspect of maintaining good health and preventing illness. By seeking professional medical advice and treatment, individuals can stay on top of their health and receive the care they need to lead a healthy and fulfilling life."
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserLandingPage;
