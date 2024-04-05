import React from "react";
import Button from "../Button";

export default function Grupos({ valor }) {
  return (
    <div className="w-screen relative">
      <div className="absolute top-2 right-2">
        <Button text={"Nuevo Grupo"} />
      </div>
      <div>
        <p className="text-lg">
          Debes: <br></br>
          <span className="text-3xl text-red-500 font-semibold">${valor}</span>
        </p>
      </div>
    </div>
  );
}
