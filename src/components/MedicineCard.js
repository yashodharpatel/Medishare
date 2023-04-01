import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/medicines/crocin.jpg";

const MedicineCard = (props) => {
  const navigate = useNavigate();
  // console.log(props.img);

  function goTo(e) {
    e.preventDefault();
    navigate(`/medicine/` + props.oid);
  }

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg mb-8 mx-6"
      onClick={goTo}
    >
      <img src={img} alt="Medicine Image" className="h-48"/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.name}</div>
        <p className="text-gray-700 text-base">Quantity: {props.quantity}</p>
        <p className="text-gray-700 text-base">Expiry: {props.expiry}</p>
      </div>
    </div>
  );
};

export default MedicineCard;
