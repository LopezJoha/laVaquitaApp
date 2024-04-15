import React, { useState } from "react";
import Button from "./Button";
import close from "../images/close.png";
import groupImg from "../images/group.png";

const colors = [
  "#f8fafc",
  "#0891b2",
  "#7c3aed",
  "#e879f9",
  "#64748b",
  "#15803d",
  "#f87171",
  "#fecdd3",
  "#fdba74",
  "#fef08a",
];

export default function Modal({ isOpen, closeModal, fnCreateGroup }) {
  const [active, setActive] = useState(0);

  if (!isOpen) {
    return null;
  }
  return (
    <div className=" w-screen h-screen fixed top-0 left-0 bg-gray-200/50 flex content-center justify-center">
      <div className="w-[500px] h-[100%] md:h-[50%] relative bg-white min-h-[250px] shadow-lg p-10 mt-10 flex flex-col content-center justify-between">
        <img
          className="absolute top-5 right-5 cursor-pointer w-[20px] h-[20px] "
          src={close}
          alt="close"
          onClick={closeModal}
        />
        <div className="flex justify-center content-center">
          <h2 className="text-[#36190D] text-xl lg:text-2xl font-bold">
            Nuevo Grupo
          </h2>
        </div>
        <div className="w-[90%] flex content-center justify-center border border-gray-300 rounded-md">
          <input className=" " type="text" placeholder="Nombre del grupo" />
          <img src={groupImg} alt="group" className="w-[20px] h-[20px] m-2.5" />
        </div>
        <div className="flex flex-wrap gap-2 justify-center content-center p-5">
          {colors.map((color, idx) => (
            <div
              key={idx}
              className={`w-[50px] h-[50px] border-2 border-solid gap-2 cursor-pointer rounded-lg ${
                active === idx ? "border-emerald-400" : "border-none"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setActive(idx)}
            ></div>
          ))}
        </div>
        <div className="flex justify-center content-center">
          <Button text={"Crear"} funcion={fnCreateGroup} />
        </div>
      </div>
    </div>
  );
}
