import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import bg from "../assets/bg.jpg";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Medicine = () => {
  const [data, setData] = useState(null);
  const [sender, setSender] = useState(null);
  const id = useParams().id;
  const navigate = useNavigate();
  const url = "http://localhost:5000";

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(url + "/getMedsById", {
          headers: {
            id: String(id),
          },
        });
        setData(res.data.med);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchSender(user) {
      try {
        console.log(data);
        const res = await axios.get(`${url}/fetch${user}ById`, {
          headers: {
            id: String(user === "Ngo" ? data.ownedby : data.addedby),
          },
        });
        console.log(res.data.data);
        setSender(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    const user = data && (data.ownedby ? "Ngo" : "User");
    fetchSender(user);
  }, [data]);

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  async function getMeds(e) {
    try {
      const res = await axios.get(url + `/getMedicineNgo`, {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZ28iOnsiaWQiOiI2M2RjODVjZGIxNDg1ZTIxOWY0ZTI0MWUifSwiaWF0IjoxNjc1NDAxNDM3fQ.AvX4oaPQOVcvGsskolpKARurY9Hwex4AfFYhG4pHjIo",
          id: String(id),
        },
      });
      if (res.data.success) {
        navigate("/fetchallmedicinengo");
      }
    } catch (err) {
      alert("Error");
      console.log(err);
    }
  }

  return (
    <div>
      <Navbar />
      {data && sender && (
        <div className="flex px-8 justify-evenly">
          <img
            src={
              data.image
                ? "data:image/jpg;base64," +
                  _arrayBufferToBase64(data.image.data.data)
                : bg
            }
            alt="Medicine"
            className="w-1/2"
          />
          <div className="bg-primary-gray rounded-lg p-8 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="font-semibold text-xl text-center">
                {data.commonname}
              </div>
              <div className="flex justify-between">
                <div className="pr-2 space-y-4">
                  <div className="font-semibold">
                    Quantity:{" "}
                    <span className="font-normal">{data.quantity}</span>
                  </div>
                  <div className="font-semibold">
                    Time: <span className="font-normal">{data.time}</span>
                  </div>
                </div>
                <div className="pl-2 space-y-4">
                  <div className="font-semibold">
                    Expiry:{" "}
                    <span className="font-normal">
                      {String(data.expiry).split("T")[0]}
                    </span>
                  </div>
                  <div className="font-semibold">
                    Owned by: <span className="font-normal">{sender.name}</span>
                  </div>
                </div>
              </div>
              <div className="font-semibold">
                Address: <span className="font-normal">{sender.address}</span>
              </div>
            </div>
            <button className="btn-primary w-full my-48" onClick={getMeds}>
              Get Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medicine;
