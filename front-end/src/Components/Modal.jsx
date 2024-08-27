import React, { useState } from "react";
import Button from "./Ui/Button";
import close from "../assets/images/close.png";
import groupImg from "../assets/images/group.png";
import axios from "axios";

const colors = [
  "#FFFFFF", // white
  "#FFC0CB", // pink
  "#FF0000", // red
  "#008000", // green
  "#800080", // purple
  "#FFA500", // orange
  "#FFFF00", // yellow
  "#000000", // black
  "#ADD8E6", // bluelight
  "#FF4500", // orangered
];
export default function Modal({
  isOpen,
  setIsOpen,
  closeModal,
  isEditing,
  setIsEditing,
  setGroups,
  currentGroup,
  createGroup,
  editGroup,
  onSubmit,
  error,
  setError,
  messageError,
  setMessageError,
  inputValue,
  setInputValue,
}) {
  const [active, setActive] = useState(colors[0]);
  const [isFocused, setIsFocused] = useState(false);

  const onInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.length === 0) {
      setMessageError(
        "El campo no puede estar vacío, Agrega el nombre del Grupo"
      );
    } else if (e.target.value.length > 30) {
      setMessageError(
        "El nombre del Grupo No puede contener más de 30 carácteres"
      );
    } else {
      setMessageError("");
    }
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div className=" w-screen h-full fixed top-0 left-0 bg-gray-200/50 flex content-center justify-center z-50">
      <div className="w-[500px] max-h-[420px] relative bg-white min-h-[250px] shadow-lg p-10 mt-10 flex flex-col content-center justify-between">
        <img
          className="absolute top-5 right-5 cursor-pointer w-[20px] h-[20px] "
          src={close}
          alt="close"
          onClick={closeModal}
        />
        <div className="flex justify-center content-center">
          <h2 className="text-[#36190D] text-xl lg:text-2xl font-bold">
            {isEditing ? "Editar Grupo" : "Nuevo Grupo"}
          </h2>
        </div>
        <div
          className={`w-[100%] flex content-center justify-between border rounded-md p-1 ${
            isFocused ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <input
            className="w-full appearance-none border-none bg-transparent p-0 m-0 focus:outline-none focus:ring-0 focus:border-none"
            type="text"
            placeholder={isEditing ? currentGroup.name : " Nombre del grupo"}
            value={inputValue}
            onChange={(e) => onInputChange(e)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <img src={groupImg} alt="group" className="w-[20px] h-[20px] m-2.5" />
        </div>
        {error ? (
          <p className="text-red-600 text-base">{messageError}</p>
        ) : null}
        <div className="flex flex-wrap gap-2 justify-center content-center p-5">
          {colors.map((color) => (
            <div
              key={color}
              className={`w-[50px] h-[50px] border-2 border-solid gap-2 cursor-pointer rounded-lg ${
                active === color
                  ? "border-emerald-400 shadow-lg shadow-cyan-500/50"
                  : "border-grey"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setActive(color)}
            ></div>
          ))}
        </div>
        <div className="flex justify-center content-center">
          <Button
            text={isEditing ? "Editar" : "Crear"}
            funcion={() => onSubmit(inputValue, active)}
            disabled={
              inputValue.length > 30 || inputValue.length === 0 ? true : false
            }
          />
        </div>
      </div>
    </div>
  );
}
