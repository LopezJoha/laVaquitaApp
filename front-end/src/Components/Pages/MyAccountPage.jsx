import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function MyAccountPage() {
  const [userName, setUserName] = useState(
    useSelector((state) => state.userReducer.userName)
  );
  const [email, setEmail] = useState(
    useSelector((state) => state.userReducer.userEmail)
  );

  
  return (
    <div className="w-[100%] h-full flex flex-col content-between gap-5 p-2">
      <div className="flex flex-col gap-3">
        <h2 className="font-plus-jakarta text-3xl lg:text-4xl font-medium text-[#582B1C]">
          Tu Cuenta:
        </h2>
        <div className="flex flex-col lg:flex-row ">
          <p className="font-plus-jakarta text-2xl lg:text-3xl  text-[#582B1C]">
            Nombre de Usuario:
          </p>
          <p className="font-plus-jakarta text-2xl lg:text-3xl font-medium text-[#582B1C]">
            {userName}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row ">
          <p className="font-plus-jakarta text-2xl lg:text-3xl  text-[#582B1C]">
            Email:
          </p>
          <p className="font-plus-jakarta text-2xl lg:text-3xl font-medium text-[#582B1C]">
            {email}
          </p>
        </div>
      </div>
     
      
    </div>
  );
}
