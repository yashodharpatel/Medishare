import React, { useEffect, useState } from "react";
import MedicineCard from "../components/MedicineCard";
import Navbar from "../components/Navbar";
import img from "../assets/bg.jpg";
import img1 from "../assets/img1.jpg";
import axios from "axios";
import { database, storage } from "../firebase";
import { useAuth } from "../Contexts/Authcontext";
import { elements } from "chart.js";

const GetMedicine = ({ org }) => {
  const [meds, setMeds] = useState([]);
  const [search, setSearch] = useState("");
  const { currentUser } = useAuth();
  const currentUserId = currentUser.uid;
  const currentUserEmail = currentUser.email;

  useEffect(() => {
    if (org == "Ngo") {
      const ngo = database.ref("ngos/" + currentUserId);
      ngo.on("value", (snapshot) => {
        const info = snapshot.val();
        // const dataArray = [];

        // // Iterate over the keys of the object and add each value to the array
        // Object.keys(info).forEach((key) => {
        //   dataArray.push(info[key].medicines);
        // });
        setMeds(info.medicines);
        console.log(info.medicines);
      });
    } else {
      const ngo = database.ref("ngos");
      ngo.on("value", (snapshot) => {
        const info = snapshot.val();
        const dataArray = [];

        // Iterate over the keys of the object and add each value to the array
        Object.keys(info).forEach((key) => {
          dataArray.push(info[key].medicines);
        });

        setMeds(dataArray);
      });
    }
  }, []);

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <div
          className="flex items-center justify-start w-full my-6 mx-8 border border-purple pl-3"
          style={{ width: "60%" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          <input
            type="text"
            className="rounded-l w-full p-3"
            style={{ outline: "none", width: "60%" }}
            placeholder="Search by names of medicines"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-1 2xl:grid-cols-4 justify-evenly px-8 pt-8 ">
        {org === "Ngo"
          ? meds
              ?.filter((medicine, index) => {
                if (search === " ") {
                  return medicine;
                } else if (
                  Object.values(medicine.name)
                    .join("")
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ) {
                  return medicine;
                }
              })
              ?.map((medicine, index) => {
                return (
                  <MedicineCard
                    name={medicine.name}
                    quantity={medicine.count}
                    expiry={medicine.date}
                    img={
                      // medicine.picture
                      //   ? "data:image/jpg;base64," +
                      //     _arrayBufferToBase64(medicine.picture)
                      //   : img
                      medicine.picture
                    }
                    desc={medicine.desc}
                    key={index}
                    // oid={element._id}
                  />
                );
              })
          : meds
              ?.map((element) => {
                return element?.filter((medicine, index) => {
                  if (search === " ") {
                    return medicine;
                  } else if (
                    Object.values(medicine.name)
                      .join("")
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return medicine;
                  }
                });
              })
              ?.map((element, index) => {
                return element?.map((medicine, index) => {
                  return (
                    <MedicineCard
                      name={medicine.name}
                      quantity={medicine.count}
                      expiry={medicine.date}
                      img={
                        // medicine.picture
                        //   ? "data:image/jpg;base64," +
                        //     _arrayBufferToBase64(medicine.picture)
                        //   : img
                        medicine.picture
                      }
                      desc={medicine.desc}
                      key={index}
                      // oid={element._id}
                    />
                  );
                });
              })}
      </div>
    </div>
  );
};

export default GetMedicine;
