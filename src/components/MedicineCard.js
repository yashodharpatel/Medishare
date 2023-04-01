import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/medicines/crocin.jpg";

const MedicineCard = (props) => {
  const navigate = useNavigate();

  function goTo(e) {
    e.preventDefault();
    navigate('/medicine/' + props.name, { state: { myData: props } });
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-8 mx-6">
      <img src={props.img} alt="Medicine Image" className="h-48" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.name}</div>
        <p className="text-gray-700 text-base">Quantity: {props.quantity}</p>
        <p className="text-gray-700 text-base">Expiry: {props.expiry}</p>
        <button
          class="bg-green-500 hover:bg-green-700 text-white p-1 border border-green-700 rounded my-2"
          onClick={goTo}
        >
          Get It Now
        </button>
      </div>
    </div>
  );
};

export default MedicineCard;
