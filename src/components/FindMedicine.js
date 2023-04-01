import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const FindMedicine = () => {
  const [medicine, setMedicine] = useState("");
  const [data, setData] = useState();

  const getMedicineData = async () => {
    console.log(medicine);
    if (medicine === "") {
      return console.log("Enter medicine");
    }
    const options = {
      method: "GET",
      url: "https://drug-info-and-price-history.p.rapidapi.com/1/druginfo",
      params: { drug: `${medicine}` },
      headers: {
        "X-RapidAPI-Key": "edfd4b0645mshc4b607cd2864adfp1aa82ajsn0394745ced1c",
        "X-RapidAPI-Host": "drug-info-and-price-history.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const data = response.data[0];
      const obj = {
        name: data.brand_name,
        genericName: data.generic_name,
        manufacturerName: data.openfda.manufacturer_name[0],
        taken: data.route[0],
        activeIngredients: {
          name: data.active_ingredients[0].name,
          strength: data.active_ingredients[0].strength,
        },
        type: data.product_type,
        class: data.openfda.pharm_class_cs
          ? data.openfda.pharm_class_cs[0]
          : "",
      };

      console.log(obj);
      setData(obj);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-ourfont">
        <Navbar />
      <div className="bg-gradient-to-r from-primary-dark to-primary-light h-screen w-1/2 mx-auto rounded-lg">
        <div className="mt-2 flex justify-center">
          <div className="flex items-center border-b-4 border-ourmedpurp my-20 bg-white p-5 rounded-lg">
            <input
              type="text"
              placeholder="Enter name of medicine"
              onChange={(e) => {
                setMedicine(e.target.value);
              }}
              className="bg-transparent border-none w-full text-subtext mr-3 py-1 h-9"
            />
          </div>
          <button
            type="button"
            onClick={getMedicineData}
            className="text-white bg-btn-left hover:bg-btn-right font-medium rounded-lg px-7 py-2 mx-5 my-20 text-lg border-b-customDark"
          >
            Submit
          </button>
        </div>

        {data ? (
          <div className="text-base font-semibold bg-gray-800 text-white mx-auto p-6 w-2/5 rounded-lg ">
            Name: {data.name} <br />
            Generic Name: {data.genericName} <br />
            Manufacturer Name: {data.manufacturerName} <br />
            How to take: {data.taken} <br />
            Ingridient Name: {data.activeIngredients.name} <br />
            Ingrident Strength: {data.activeIngredients.strength} <br />
            Type: {data.type} <br />
            {data.class && (
              <>
                Classification: {data.class} <br />
              </>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default FindMedicine;
