// import React, { useState } from "react";
import Navbar from "../components/Navbar";
// import bg from "../assets/bg.jpg";
import donatemedicine from "../assets/donate-medicine.gif";
// import axios from "axios";

import React, { useState, useEffect, Profiler, useId } from "react";
import { database, storage } from "../firebase";
import { useAuth } from "../Contexts/Authcontext";

const PostMedicine = () => {
  const { currentUser } = useAuth();
  const currentUserId = currentUser.uid;
  const currentUserEmail = currentUser.email;

  const [medicineName, setmedicineName] = useState("");
  const [tabletCount, settabletCount] = useState();
  const [expiryDate, setexpiryDate] = useState("");
  const [medicineDesc, setmedicineDesc] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [ngo, setngo] = useState([]);
  const [ngonames, setngonames] = useState([]);

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

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch(profilePicture);
    const blob = await response.blob();

    try {
      storage
        .ref(`/pictures/${currentUserId}/${medicineName}`)
        .put(blob)
        .on("state_changed", () => {
          // Getting Download Link
          storage
            .ref("pictures")
            .child(currentUserId)
            .child(medicineName)
            .getDownloadURL()
            .then((url) => {
              addmedicine(
                medicineName,
                tabletCount,
                expiryDate,
                medicineDesc,
                url
              );
              setmedicineName("");
              settabletCount("");
              setexpiryDate("");
              setmedicineDesc("");
            });
        });

        if (userId !== "" && medicines.length !== 0) {
          database.ref("ngos/" + currentUserId).update({ medicines: medicines });
          medicines = [];
        }
    } catch {
      console.log("Problem occured");
    }
  };

  let intiMedicine;
  if (localStorage.getItem("medicines") === null) {
    intiMedicine = [];
  } else {
    intiMedicine = JSON.parse(localStorage.getItem("medicines"));
  }

  const [medicines, setMedicines] = useState(intiMedicine);

  useEffect(() => {
    localStorage.setItem("medicines", JSON.stringify(medicines));
  }, [medicines]);

  const [userId, setUserId] = useState("");

  let selectedngo = document?.getElementById("ngo-selected")?.value;

  useEffect(() => {
    const fetchUserId = async () => {
      const usersRef = database.ref("ngos");
      usersRef.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const user = childSnapshot.val();
          if (user.Name === selectedngo) {
            setUserId(childSnapshot.key);
          }
        });
      });
    };
    fetchUserId();
  }, []);

  const submitMedicines = () => {
    submit();
    if (userId !== "" && medicines.length !== 0) {
      database.ref("ngos/" + currentUserId).update({ medicines: medicines });
      medicines = [];
    }
  };

  const addmedicine = (name, count, date, desc, picture) => {
    let sno =
      medicines.length === 0 ? 0 : medicines[medicines.length - 1].sno + 1;
    const mymedicine = {
      sno: sno,
      name: name,
      count: count,
      date: date,
      desc: desc,
      picture: picture,
    };
    setMedicines([...medicines, mymedicine]);
  };

  const onDelete = (medicine) => {
    // Deleting this way in react does not work
    // let index = medicines.indexOf(medicine);
    // medicines.splice(index, 1);

    setMedicines(
      medicines.filter((e) => {
        return e !== medicine;
      })
    );
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
      <div className="mx-auto bg-gradient-to-r from-primary-dark to-primary-light min-h-screen rounded-xl w-3/4">
        <div className="text-center font-bold text-3xl p-2 pt-6">
          Donate Medicines
        </div>
        <div className="flex justify-center space-x-4 ">
          {/* <img src={bg} alt="img" className='backgroundimage relative opacity-50 rounded-lg ' /> */}
          <div className="rounded-lg flex">
            <img src={donatemedicine} alt="image" className="-translate-y-4" />
            <div className="flex flex-col min-w-full min-h-full mb-7">
              <form onSubmit={submit}>
              <div className="py-2 px-4">
                <label className="font-medium text-lg">Medicine Name</label>
                <div className="flex flex-row flex-wrap justify-between">
                  <input
                    type="text"
                    name="commonName"
                    className="rounded-xl border border-purple w-96 p-1"
                    value={medicineName}
                    placeholder="Medicine Name"
                    onChange={(e) => setmedicineName(e.target.value)}
                  />
                </div>
              </div>

              <div className="py-2 px-4">
                <label className="font-medium text-lg"> Tablet Count</label>
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

              <div className="py-2 px-4">
                <label className="font-medium text-lg">Expiry Date</label>
                <div className="flex flex-row flex-wrap justify-between">
                  <input
                    type="date"
                    name="expiry_date"
                    className="rounded-xl border border-purple w-96 p-1"
                    value={expiryDate}
                    placeholder="Expiry Date"
                    onChange={(e) => setexpiryDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="py-2 px-4">
                <label className="font-medium text-lg">Description</label>
                <div className="flex flex-row flex-wrap justify-between">
                  <input
                    type="text"
                    name="scientificName"
                    className="rounded-xl border border-purple w-96 p-1"
                    value={medicineDesc}
                    placeholder="Description"
                    onChange={(e) => setmedicineDesc(e.target.value)}
                  />
                </div>
              </div>

              <div lassName="py-2 px-4">
                <label className="font-medium text-lg">
                  Picture of the medicine:
                </label>
                <div className="flex flex-row flex-wrap justify-between">
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    id="profile-picture"
                    onChange={imagePreview}
                  />
                </div>
              </div>

              <div lassName="py-2 px-4">
                <label className="font-medium text-lg">
                  Select a NGO to donate medicine
                </label>
                <select className="p-2 mt-2 mb-3 mr-2" id="ngo-selected">
                  {ngonames.map((x, y) => (
                    <option value={x} key={y}>
                      {x}
                    </option>
                  ))}
                </select>
              </div>

              <div className="py-2 px-4">
                <button
                  className="btn-primary"
                  type="submit"
                >
                  Donate
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostMedicine;
