import React from "react";
import TabGroup from "../Components/TabGroup";
import logo from "../images/vaquita-nb.png";
import user from "../images/user-48.png";

export default function Header({ active, setActive, tabs }) {
  return (
    <>
      <div className="w-screen flex  lg:flex-row justify-between bg-[#36190D] p-3 flex-wrap ">
        <div className="logo flex items-end justify-around order-1 grow-0">
          <img src={logo} alt="logo" width={45} />
          <p className="text-center text-2xl lg:text-3xl ml-2 font-medium lg:font-extrabold text-white">
            Mi Vaquita
          </p>
        </div>
        <div className=" grow-0 order-2 lg:order-3 h-fit p-1 bg-white rounded-[100px]">
          <img src={user} alt="user" width={25} height={25} />
        </div>
        <TabGroup active={active} setActive={setActive} tabs={tabs} />
      </div>
    </>
  );
}
