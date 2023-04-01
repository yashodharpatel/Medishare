import React from "react";

const DoctorCard = (props) => {
  const sendEmail = async (e) => {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({service_id: "service_eawigvc", template_id: "template_k5l84mc", user_id : "sSZZrdkrbeJA0odZJ"})
    })
    const json = await response.json
        alert('Your meeting will be held at this link https://whereby.com/care-swap')
  };

  return (
    <div className="rounded overflow-hidden shadow-lg mb-8 mx-6 bg-white">
      <div className="px-6 py-4">
        <div className="flex-col">
          <div className="flex items-center justify-center">
            <img src={props.image} alt="doctor" className="h-65"/>
          </div>
          <div>
            <div className="text-primary-black font-bold text-xl my-3">
              {props.name}
            </div>
            <div className="my-1 text-lg">
              <p className="text-gray-700 text-base">
                Contact: <b> {props.number}</b>
              </p>
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
            <button className="btn-primary mt-3 text-lg" onClick={sendEmail}>
              Consult
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
