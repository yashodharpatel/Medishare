import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DoctorCard from "../components/DoctorCard";
import { database, storage } from "../firebase";
import { useAuth } from "../Contexts/Authcontext";
import dr1 from "../assets/doctors/dr1.jpg";
import dr2 from "../assets/doctors/dr2.jpg";
import dr3 from "../assets/doctors/dr3.jpg";

const Consult = () => {
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const ngo = database.ref("doctors");
    ngo.once("value", (snapshot) => {
      const info = snapshot.val();
      setDoctors(info);
    });
  }, []);

  return (
    <div className="max-h-screen">
      <Navbar />
      <div className="bg-gradient-to-r from-primary-dark to-primary-light h-100vh mx-auto text-white text-center">
        <div className="text-center font-bold text-3xl p-2 pt-6">
          Consult With The Doctors
        </div>
        <div className="grid grid-cols-3 p-4 m-2">
          {Object.keys(doctors).map((keyName, i) => {
            return (
              <DoctorCard
                key={i}
                image={doctors[keyName].profile}
                name={doctors[keyName].name}
                city={doctors[keyName].city}
                qualification={doctors[keyName].qualification}
                email={doctors[keyName].email}
                number={doctors[keyName].number}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Consult;
