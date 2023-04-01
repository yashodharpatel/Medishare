import React, { useState } from "react";
import BarChart from "../components/BarChart";
import { UserData } from "../components/Data";
import PieChart from "../components/PieChart";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.month),
    datasets: [
      {
        label: "Quantity sold",
        data: UserData.map((data) => data.userLost),
      },
    ],
  });

  return (
    <div>
      <Navbar />
      <div className="flex justify-center my-6">
        <div>
          <BarChart chartData={userData} />
        </div>
        <div className="content-center">
          <p className="bg-gray-100">Bar Chart with Number of Expriries:</p>
        </div>
      </div>
      <div className="flex justify-center">
        <div>
          <PieChart chartData={userData} />
        </div>
        <div className="content-center">
          <p className="bg-gray-100">Pie Chart for Medicines:</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
