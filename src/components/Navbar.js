import React from 'react'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleClick=()=>{
    localStorage.clear();
    navigate('/login')
  }
  return (
    <div className="py-2 px-16 flex items-center bg-primary-gray justify-between border-2 border-b-primary-gray ">
      <div className="flex items-center">
        <img className="w-[50px]"  />
        <a href='/' className="font-bold text-2xl text-[#3A8EF6] ml-4">
          CareSwap
        </a>
      </div>
      <div>
        <button className="btn-primary mt-2" onClick={handleClick}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar