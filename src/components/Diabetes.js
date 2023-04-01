import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from './Navbar'

const Diabetes = () => {
  const [pregnancies, setPregnancies] = useState();
  const [glucose, setGlucose] = useState();
  const [bp, setBp] = useState();
  const [skin, setSkin] = useState();
  const [insulin, setInsulin] = useState();
  const [bmi, setBmi] = useState();
  const [pedigree, setPedigree] = useState();
  const [age, setAge] = useState();
  const [outcome, setOutcome] = useState(null);

  useEffect(() => {}, [outcome]);

  function changePreg(e) {
    setPregnancies(e.target.value);
  }
  function changeGlu(e) {
    setGlucose(e.target.value);
  }
  function changeBp(e) {
    setBp(e.target.value);
  }
  function changeSkin(e) {
    setSkin(e.target.value);
  }
  function changeInsu(e) {
    setInsulin(e.target.value);
  }
  function changeBmi(e) {
    setBmi(e.target.value);
  }
  function changePedigree(e) {
    setPedigree(e.target.value);
  }
  function changeAge(e) {
    setAge(e.target.value);
  }

  const url = "http://localhost:7000";

  async function predict(e) {
    e.preventDefault();

    const data = {
      pregnancies,
      glucose,
      bp,
      skin,
      insulin,
      bmi,
      pedigree,
      age,
    };
    try {
      const response = await axios.post(`${url}/predict`, {},
        {
          headers: data,
        }
      );
      console.log(response.data);
      setOutcome(response.data.prediction);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  return (
    <div className="overflow-y-hidden">
      <Navbar />
      {/* <div className="w-full h-full bg-gradient-to-r from-primary-dark to-primary-light"> */}
      <div id="dropdown" className="mx-auto rounded-md shadow w-1/2 bg-gradient-to-r from-primary-dark to-primary-light" >
        <div className="flex flex-col justify-between items-center mt-5">
          <input
            type="number"
            placeholder="No. Of Pregnancies"
            value={pregnancies}
            onChange={changePreg}
            className="p-3 m-3 rounded-md"
          />
          <input
            type="number"
            placeholder="Glucose Level"
            value={glucose}
            onChange={changeGlu}
            className="p-3 m-3 rounded-md"
          />
          <input
            type="number"
            placeholder="Blood Pressure"
            value={bp}
            onChange={changeBp}
            className="p-3 m-3 rounded-md"
          />
          <input
            type="number"
            placeholder="Skin Thickness"
            value={skin}
            onChange={changeSkin}
            className="p-3 m-3 rounded-md"
          />
          <input
            type="number"
            placeholder="Insulin Level"
            value={insulin}
            onChange={changeInsu}
            className="p-3 m-3 rounded-md"
          />
          <input
            type="number"
            placeholder="BMI"
            value={bmi}
            onChange={changeBmi}
            className="p-3 m-3 rounded-md"
          />
          <input
            type="number"
            placeholder="Diabetes Pedigree Function"
            value={pedigree}
            onChange={changePedigree}
            className="p-3 m-3 rounded-md"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={changeAge}
            className="p-3 m-3 rounded-md"
          />
          <button
            className="text-primary-black mb-5 bg-white rounded-lg hover:bg-gray-100 hover:shadow-lg text-md px-5 py-2 m-5 mx-5 "
            onClick={predict}
            type="submit"
          >
            Submit
          </button>
          {outcome && (
            <p className="text-white text-lg font-bold mb-10">
              {outcome === 1 ? "You have Diabetes" : "You don't have Diabetes"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Diabetes;
