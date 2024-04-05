import React from "react";
import imagen from "../images/vaquita-nb.png";

export default function Group({
  debt,
  name,
  valor,
  amigos,
  textDebt,
  bgColour,
}) {
  return (
    <div className="relative flex shadow-lg w-[95%] p-4 md:flex-col md:w-[350px]">
      <img
        className="absolute md:top-3 md:left-3"
        src={imagen}
        alt="imgGroup"
        style={{ backgroundColor: bgColour }}
        width={80}
        height={80}
      ></img>
      <div className="flex flex-col ml-[85px]">
        <h3 className="text-3l md:text-3xl md:font-medium md:text-center md:p-9 md:bg-[#36190D] md:text-white">
          {name}
        </h3>
        <p className="text-2l">
          {debt}: <span style={{ color: textDebt }}>${valor}</span>
        </p>
        <p className="hidden text-2l lg:block">
          Participantes:
          <span className="text-amber-500"> {amigos}</span>
        </p>
        <div className="flex ">
          <button className="bg-[#36190D] p-1 px-2 mt-2 mr-2 text-white">
            Editar
          </button>
          <button className="bg-[#36190D] p-1 px-2 mt-2 mr-2 text-white">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
