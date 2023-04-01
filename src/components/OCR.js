import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
// import Navbar from "../../components/Navbar";
import presc from "../assets/PRESCRIPTION_1.svg";

const OCR = () => {
  const [file, setFile] = useState(null);
  const [meds, setMeds] = useState(null);

  function filesubmit(e) {
    setFile(e.target.files[0]);
  }

  useEffect(() => {}, [meds]);

  async function processImage() {
    // console.log(file);
    await Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      const txt = text.split("\n");
      txt.pop();
      //   console.log(txt);
      setMeds(txt);
    });
  }

  return (
    <div className="font-ourfont z-0">
      <div className="absolute">
        {/* <Navbar /> */}
      </div>
      <div className="bg-gradient-to-r from-primary-dark to-primary-light text-white w-screen h-screen flex flex-col items-center overflow-hidden">
        <div className="flex justify-center items-center">
          <div>
            <div className="flex justify-center my-4 mb-16">
              <div className="text-3xl font-bold overflow-hidden mt-40 text-white">
                Scan your image and get the details!
              </div>
            </div>
            <div>
              <input type="file" id="customFile" onChange={filesubmit} />
              <button
                type="button"
                className="bg-white text-primary-black px-3 py-2 ml-36 rounded hover:bg-gray-200"
                onClick={() => {
                  processImage();
                }}
              >
                Upload
              </button>
            </div>
            {meds &&
              meds.map((med) => {
                med = med[0].toUpperCase() + med.substring(1);
                return (
                  <div className="text-white rounded-lg bg-gray-200 my-3 mt-8">
                    <p className="p-4 text-xl text-center font-semibold  text-primary-black">
                      {med}
                    </p>
                  </div>
                );
              })}
          </div>

          {/* <div className="w-1/3 absolute t-0 r-0 z-10">
            <img src={presc} alt="prescription" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default OCR;
