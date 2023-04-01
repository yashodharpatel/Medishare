import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { database, storage } from "../firebase";
import { useAuth } from "../Contexts/Authcontext";
import girl from "../assets/girl.png";
import { useNavigate } from "react-router-dom";

const Medicine = () => {
  const { currentUser } = useAuth();
  const currentUserId = currentUser.uid;
  const currentUserEmail = currentUser.email;
  const navigate = useNavigate();

  const [medicineName, setmedicineName] = useState("");
  const [tabletCount, settabletCount] = useState();
  const [medicineDesc, setmedicineDesc] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const [ngo, setngo] = useState([]);
  const [ngonames, setngonames] = useState([]);

  const { state } = useLocation();
  const props = state?.myData;

  useEffect(() => {
    const ngo = database.ref("ngos");
    ngo.once("value", (snapshot) => {
      const info = snapshot.val();
      setngo(info);
    });
  }, []);

  if (ngonames.length == 0) {
    Object.keys(ngo).forEach(function (key) {
      ngonames.push(ngo[key].Name);
    });
  }

  //   const [filteredNgos, setfilteredNgos] = useState([]);

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch(profilePicture);
    const blob = await response.blob();

    try {
      storage
        .ref(`/precrecptions/${currentUserId}`)
        .put(blob)
        .on("state_changed", () => {
          // Getting Download Link
          storage
            .ref("precrecptions")
            .child(currentUserId)
            .getDownloadURL()
            .then((url) => {
              setmedicineName("");
              settabletCount("");
              setmedicineDesc("");
              setProfilePicture("");
            });
        });

        navigate('/clienthome');
    } catch {
      console.log("Problem occured");
    }
  };

  const imagePreview = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfilePicture(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto bg-gradient-to-r from-primary-dark to-primary-light rounded-xl w-3/4 mt-8">
        <div className="text-center font-bold text-3xl p-2 pt-6">
          Order Medicines
        </div>
        <div className="flex justify-center space-x-4 ">
          {/* <img src={bg} alt="img" className='backgroundimage relative opacity-50 rounded-lg ' /> */}
          <div className="rounded-lg flex">
            <img src={girl} alt="image" className="-translate-y-4" />
            <form onSubmit={submit}>
              <div className="flex flex-col min-w-full min-h-full mb-7">
                <div className="py-2 px-4">
                  <label className="font-medium text-lg">Medicine Name:</label>
                  <div className="flex flex-row flex-wrap justify-between">
                    <input
                      type="text"
                      name="commonName"
                      className="rounded-xl border border-purple w-96 p-1"
                      defaultValue={props?.name}
                      value={props?.name}
                      disabled
                      // placeholder="Medicine Name"
                      // onChange={(e) => setmedicineName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="py-2 px-4">
                  <label className="font-medium text-lg">Medicine Description:</label>
                  <div className="flex flex-row flex-wrap justify-between">
                    <input
                      type="text"
                      name="desc"
                      className="rounded-xl border border-purple w-96 p-1"
                      defaultValue={props?.desc}
                      value={props?.desc}
                      disabled
                      // placeholder="Description"
                      // onChange={(e) => setmedicineDesc(e.target.value)}
                    />
                  </div>
                </div>

                <div className="py-2 px-4">
                  <label className="font-medium text-lg">Medicine Expiry:</label>
                  <div className="flex flex-row flex-wrap justify-between">
                    <input
                      type="date"
                      name="expiry_date"
                      className="rounded-xl border border-purple w-96 p-1"
                      defaultValue={props.expiry}
                      value={props.expiry}
                      disabled
                      // placeholder="Description"
                      // onChange={(e) => setmedicineDesc(e.target.value)}
                    />
                  </div>
                </div>

                <div className="py-2 px-4">
                  <label className="font-medium text-lg">Enter Quantity:</label>
                  <div className="flex flex-row flex-wrap justify-between">
                    <input
                      type="number"
                      name="quantity"
                      className="rounded-xl border border-purple w-96 p-1"
                      value={tabletCount}
                      placeholder="Tablet Count"
                      onChange={(e) => settabletCount(e.target.value)}
                    />
                  </div>
                </div>

                {/* <div className="py-2 px-4">
                <label className="font-medium text-lg">Scientific Name:</label>
                <div className="flex flex-row flex-wrap justify-between">
                  <input
                    type="text"
                    name="scientificName"
                    className="rounded-xl border border-purple w-96 p-1"
                    value={scientificname}
                    onChange={(e) => {
                      setScientificname(e.target.value);
                    }}
                  />
                </div>
              </div> */}

                {/* <div className="py-2 px-4">
                <label className="font-medium text-lg">Manufacturer:</label>
                <div className="flex flex-row flex-wrap justify-between">
                  <input
                    type="text"
                    name="scientificName"
                    className="rounded-xl border border-purple w-96 p-1"
                    value={manufacturer}
                    onChange={(e) => {
                      setManufacturer(e.target.value);
                    }}
                  />
                </div>
              </div> */}
                {/* <div className="py-2 px-4">
                <label className="font-medium text-lg">Time Of Delivery:</label>
                <div className="flex flex-row flex-wrap justify-between">
                  <input
                    type="text"
                    name="scientificName"
                    className="rounded-xl border border-purple w-96 p-1"
                    value={time}
                    onChange={(e) => {
                      setTime(e.target.value);
                    }}
                  />
                </div>
              </div> */}

                <div className="py-2 px-4">
                  <label className="font-medium text-lg">
                    Upload Image of medicine script
                  </label>
                  <div className="flex flex-row flex-wrap justify-between">
                    <input
                      type="file"
                      accept="image/*"
                      className="rounded-xl border border-purple w-96 p-1"
                      id="profile-picture"
                      onChange={imagePreview}
                    />
                  </div>
                </div>
                <div className="py-2 px-4">
                  <button className="btn-primary">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medicine;
