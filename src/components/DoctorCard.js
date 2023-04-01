import React from "react";

const DoctorCard = (props) => {

  return (
    <div className="rounded overflow-hidden shadow-lg mb-8 mx-6 bg-white">
      <div className="px-6 py-4">
        <div className="flex-col">
          <div>
            <img src={props.image} alt="doctor" />
          </div>
          <div>
            <div className="text-primary-black font-bold text-xl mb-2">
              {props.name}
            </div>
            <div className="my-1 text-lg">
              {/* <p className="text-gray-700 text-base">
                Contact: <b> {props.number}</b>
              </p> */}
              <p className="text-gray-700 text-base">
                Email: <b>{props.email}</b>
              </p>
              <p className="text-gray-700 text-base">
                City: <b>{props.city} </b>
              </p>
              <p className="text-gray-700 text-base">
                Qualification: <b>{props.qualification}</b>
              </p>
            </div>
            <button className="btn-primary mt-3 text-lg">
              Consult
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
