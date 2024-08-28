import React from "react";
import imagen from "../assets/images/vaquita-nb.png";

export default function Group({
  group,
  funcionEditar,
  funcionEliminar,
  handleNavigate,
}) {
  return (
    <div className="flex shadow-lg w-full  max-w-[380px] gap-3">
      <div className="flex justify-center items-center p-2 md:hidden">
        <img
          className="md:hidden rounded"
          src={imagen}
          alt="imgGroup"
          style={{ backgroundColor: group.color }}
          width={120}
          height={80}
        ></img>
      </div>

      <div className="w-full flex flex-col w-full ml-2 py-2">
        <div className=" justify-center md:justify-start items-center md:items-start p-2 md:flex md:bg-[#36190D]">
          <img
            className=" hidden md:flex rounded"
            src={imagen}
            alt="imgGroup"
            style={{ backgroundColor: group.color }}
            width={80}
            height={80}
          ></img>
          <h3 className=" w-full text-2xl md:text-3xl md:font-medium md:text-center  md:ml-2 md:text-white font-semibold">
            {group.name}
          </h3>
        </div>
        <p className="text-2l">
          {group.debt}:{" "}
          <span style={{ color: group.textDebt }}>${group.valor}</span>
        </p>
        <p className="hidden text-2l lg:block">
          Participantes:
          <span className="text-amber-500"> {group.amigos}</span>
        </p>
        <div className="w-full flex justify-start md:justify-center items-center gap-2 ">
          <button
            className="bg-[#36190D] p-1 px-2  text-white rounded"
            onClick={(e) => handleNavigate(e, group)}
          >
            Ver
          </button>
          <button
            className="bg-[#36190D] p-1 px-2  text-white rounded"
            onClick={(e) => funcionEditar(e, group)}
          >
            Editar
          </button>
          <button
            className="bg-[#36190D] p-1 px-2  text-white rounded"
            onClick={(e) => funcionEliminar(e, group)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
