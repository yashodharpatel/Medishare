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
      <div className="px-16 pb-12 bg-gradient-to-r from-primary-dark to-primary-light flex justify-center items-center py-8 gap-3">
        {/* <div className="space-y-4 w-8/12 "> */}
          <div
            className=" justify-center items-center flex flex-col bg-white rounded-3xl "
            onClick={handle1}
          >
            <img src={Want} alt="img" className="w-44 "/>
            <Card
              heading="Want Medicine?"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias temporibus explicabo cumque, impedit qui libero dicta, ipsum laudantium officiis porro voluptates a aliquam tempore dolorem magnam ducimus odio repellendus architecto."
            />
          </div>

          <div
            className="flex flex-col justify-center items-center bg-white rounded-3xl "
            onClick={handle2}
          >
            <img src={Donate} alt="img" className="w-44" />
            <Card
              heading="Donate Medicine?"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias temporibus explicabo cumque, impedit qui libero dicta, ipsum laudantium officiis porro voluptates a aliquam tempore dolorem magnam ducimus odio repellendus architecto."
            />
          </div>

          <div
            className=" flex flex-col justify-center items-center bg-white rounded-3xl "
            onClick={handle3}
          >
            <img src={Search} alt="img" className="w-44" />
            <Card
              heading="Claim Rewards?"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias temporibus explicabo cumque, impedit qui libero dicta, ipsum laudantium officiis porro voluptates a aliquam tempore dolorem magnam ducimus odio repellendus architecto."
            />
          </div>

          <a
            href="/consult"
            className=" flex flex-col justify-center items-center bg-white rounded-3xl hover:shadow-primary-sd"
          >
            <img src={Doctor} alt="img" className="w-44" />
            <Card
              heading="Need Consultation?"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias temporibus explicabo cumque, impedit qui libero dicta, ipsum laudantium officiis porro voluptates a aliquam tempore dolorem magnam ducimus odio repellendus architecto."
            />
          </a>
        </div>
      {/* </div> */}
    </div>
  );
};

export default UserLandingPage;
