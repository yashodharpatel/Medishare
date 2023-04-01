import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
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
        .ref(`/pictures/eUtpuEjeBJY4jvxYJtWMfA0Aten1/${medicineName}`)
        .put(blob)
        .on("state_changed", () => {
          // Getting Download Link
          storage
            .ref("pictures")
            .child("eUtpuEjeBJY4jvxYJtWMfA0Aten1")
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
    if (medicines.length !== 0) {
      database.ref("ngos/" + "eUtpuEjeBJY4jvxYJtWMfA0Aten1").update({ medicines: medicines });
      // medicines = [];
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
      <div className="mx-auto from-primary-dark to-primary-light rounded-xl">
        <div className="text-center font-bold text-3xl p-2 pt-6">
          Donate Medicines
        </div>
        <div className="flex justify-center space-x-4 pt-4">
          {/* <img src={donatemedicine} alt="image" className="-translate-y-4" /> */}
          <div className="rounded-lg flex bg-gradient-to-r p-4 w-4/12">
            <div className="flex flex-col min-w-full min-h-full">
              <div className="text-center font-bold text-2xl p-2 pt-6">
                Add a Medicine
              </div>
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
                  <label className="font-medium text-lg">Tablet Count</label>
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

                <div className="py-2 px-4">
                  <label className="font-medium text-lg">
                    Picture of the medicine:
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
                  <button className="btn-primary" type="submit">
                    Add Medicine
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="rounded-lg flex flex-col p-4 border border-sky-500 w-4/12">
            <div className="text-center font-bold text-2xl p-2 pt-6">
              Medicines List
            </div>
            {medicines.length === 0 ? (
              <h4>No Medicines here yet</h4>
            ) : (
              medicines.map((medicine) => {
                return (
                  <div className="mb-3">
                    <h4 className="font-bold" id={medicine.sno}>{medicine.name}</h4>
                    <p>Count = {medicine.count}</p>
                    <p>Expiry = {medicine.date}</p>
                    <p>Description = {medicine.desc}</p>
                    <button
                     class="bg-red-500 hover:bg-red-700 text-white p-1 border border-red-700 rounded my-2"
                      onClick={() => {
                        onDelete(medicine);
                      }}
                    >
                      Delete
                    </button>
                    <hr />
                  </div>
                );
              })
            )}
            {medicines.length!==0 ? <>
            <div className="mt-4">Select a NGO to donate medicine</div>
            <select className="rounded-xl border border-purple w-100 p-1 mb-4" id="ngo-selected">
              {ngonames.map((x, y) => (
                <option value={x} key={y}>
                  {x}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="btn-primary"
              onClick={() => {
                submitMedicines();
              }}
            >
              Submit
            </button> </>: null }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostMedicine;
