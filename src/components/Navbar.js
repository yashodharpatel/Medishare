import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database, storage } from "../firebase";
import { useAuth } from "../Contexts/Authcontext";

const Navbar = (props) => {
  const navigate = useNavigate();
  const handleClick=()=>{
    localStorage.clear();
    navigate('/login')
  }

  const { currentUser } = useAuth();
  const currentUserId = currentUser.uid;
  const currentUserEmail = currentUser.email;

  return (
    <div className="py-2 px-16 flex items-center bg-primary-gray justify-between border-2 border-b-primary-gray ">
      <div className="flex items-center">
        <img className="w-[50px]"  />
        <a href='/' className="font-bold text-2xl text-[#3A8EF6] ml-4">
          CareSwap
        </a>
      </div>
      <div className="flex items-center justify-center">
        <div className="pr-3">{currentUser?.email}</div>
        <button className="btn-primary mb-0" onClick={handleClick} style={{marginBottom: "0px"}}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar