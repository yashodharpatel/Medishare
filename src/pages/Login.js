import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import authImgMain from "../assets/AuthImageMain.jpg";
import authbottom from "../assets/AuthBottom.svg";
import clouds from "../assets/Clouds.svg";
import injection from "../assets/Injection.svg";
import plus from "../assets/PlusSignsMirror.svg";

import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/Authcontext";
import logo from "../assets/logo.jpeg";

const Login = () => {
  const navigate = useNavigate();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // const url = "http://localhost:5000/";

  // const loginUser = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // console.log(url + `login${role}`);
  //     // console.log(email, password);
  //     // const res = await axios.post(url + `login${role}`, { email, password });
  //     // console.log(res);
  //     // const token = res.data.authToken;
  //     // console.log(token);
  //     // localStorage.setItem("token", token);
  //     // localStorage.setItem("userType", role);
  //     navigate("/clienthome");
  //   } catch (err) {
  //     setEmail("");
  //     setPassword("");
  //     alert("Error occured while logging in");
  //     console.log(err);
  //   }
  // };

  // my code starts here
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      // history.push("/dashboard/");
      // document.querySelector(".modal-backdrop").remove();
      if (role == "ngo") {
        navigate("/fetchallmedicinengo");
      } else {
        navigate("/clienthome");
      }
    } catch {
      setError("Failed to Sign In");
    }

    setLoading(false);
  }

  return (
    <div className="h-screen formClass overflow-y-hidden">
      <div style={{ marginLeft: "100px", position: "absolute" }}>
        <img src={logo} alt="alternate" style={{ width: "35%" }} />
      </div>
      <div className="flex">
        <div className="w-1/2 overflow-y-hidden">
          <img
            src={authImgMain}
            alt="alternate"
            className="ml-8"
            style={{ marginTop: "6rem" }}
          />
        </div>
        <div className="flex-1 h-screen w-50% justify-center content-center ml-12 z-10">
          <div className="flex flex-col w-full h-screen justify-center content-center">
            <div className="ml-4 w-[500px] bg-white h-[550px] my-auto rounded-3xl shadow-primary-sd justify-center content-center text-left overflow-y-hidden">
              <div className="p-10 ml-5">
                <p className="font-ourfont font-bold text-3xl overflow-y-hidden text-primary-black">
                  Log In at care-swap
                </p>
                
                {/* <p className="mt-3 font-ourfont font-normal text-sm text-subtext">
                  New to our site?
                </p>
                <span className="font-ourfont font-normal text-sm text-subtext">
                  You can{" "}
                </span>
                <button className="font-ourfont font-semibold text-sm text-ourmedpurp">
                  Register Here!
                </button> */}
                <br />
                {error && <div className="pt-2 text-danger">{error}</div>}
                <form className="w-full max-w-sm mt-5" onSubmit={handleSubmit}>
                  <p className="font-medium">Email</p>
                  <div className="flex items-center border-b-2 border-ourmedpurp ">
                    <input
                      className="appearance-none bg-transparent border-none w-full text-subtext mr-3 py-1 leading-tight focus:outline-none"
                      type="email"
                      id="email"
                      ref={emailRef}
                      placeholder="Email address"
                      required
                    />
                  </div>
                  <p className="font-medium mt-5">Password</p>
                  <div className="flex items-center border-b-2 border-ourmedpurp ">
                    <input
                      className="appearance-none bg-transparent border-none w-full text-subtext mr-3 py-1 leading-tight focus:outline-none"
                      type="password"
                      id="password"
                      ref={passwordRef}
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="type"
                      className="font-medium mt-5 block mb-1 text-sm text-neutralSecondary"
                    >
                      Role:
                    </label>
                    <select
                      type="text"
                      name="role"
                      id="role"
                      value={role}
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                      className="border-b-2 text-gray-900 text-sm rounded-sm focus:outline-none focus:border-b-buttons block w-full p-2 bg-[#F0F0F0] placeholder-[#F0F0F0] "
                      required
                    >
                      <option defaultValue>Choose a type</option>
                      <option value="user">User</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="ngo">NGO</option>
                      <option value="doctor">Doctor</option>
                    </select>
                  </div>
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={loading}
                      id="loginbutton"
                      className="flex-shrink-0 bg-gradient-to-r from-btn-left to-btn-right text-sm text-white py-3 px-1 rounded-3xl w-1/2 font-medium btn-primary"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src={authbottom} alt="bottom" className="absolute bottom-0" />
      {/* <img
        src={clouds}
        alt="bottom"
        className="absolute z-0 w-[850px] h-[340px] right-[30px] top-[20px] "
      />
      <img
        src={injection}
        alt="bottom"
        className="absolute z-10 h-[315px] right-[485px] top-2 "
      />
      <img
        src={plus}
        alt="bottom"
        className="absolute z-10 h-[200px] right-[180px] top-9"
      /> */}
    </div>
  );
};

export default Login;
