import React, { useState } from "react";
import Button from "./Button";
import close from "../assets/images/close.png";
import groupImg from "../assets/images/group.png";
import axios from "axios";
const url = "http://localhost:3001/groups/";
const colors = [
  "white",
  "pink",
  "red",
  "green",
  "purple",
  "orange",
  "yellow",
  "black",
  "bluelight",
  "orangered",
];
export default function Modal({
  isOpen,
  setIsOpen,
  closeModal,
  isEditing,
  setIsEditing,
  setGroups,
  currentGroup,
}) {
  const [active, setActive] = useState(colors[0]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");

  const createGroup = async (newGroup) => {
    axios({
      method: "post",
      url,
      data: newGroup,
    })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setGroups((prevGroups) => {
          return [...prevGroups, response.data];
        });
        setError(false);
        setMessageError("");
        setInputValue("");
      })
      .catch((error) => {
        console.error("Error creando el grupo", error);
        console.log(error.response.data.message);

        setError(true);
        setMessageError(error.response.data.message);
      });
  };

  const editGroup = async (id, group) => {
    axios({
      method: "put",
      url: `http://localhost:3001/groups/${id}`,
      data: group,
    })
      .then((response) => {
        setGroups((prevGroups) => {
          let copy = [...prevGroups];
          let groupIndex = copy.findIndex((group) => {
            return group.id === id;
          });

          if (groupIndex >= 0) {
            copy[groupIndex] = response.data;
          }
          return copy;
        });

        setInputValue("");
        //alert("Grupo Modificado con exito!");
        setIsOpen(false);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error actualizando el grupo", error);
        console.log(error.response.data.message);
        setError(true);
        setMessageError(error.response.data.message);
      });
  };

  const onSubmit = async () => {
    if (!isEditing) {
      await createGroup({
        id: inputValue,
        name: inputValue,
        bgColour: active,
      });
    } else {
      await editGroup(currentGroup.id, { name: inputValue, bgColour: active });
    }
  };

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
    <div className=" w-screen h-screen fixed top-0 left-0 bg-gray-200/50 flex content-center justify-center z-50">
      <div className="w-[500px] h-[100%] md:h-[50%] relative bg-white min-h-[250px] shadow-lg p-10 mt-10 flex flex-col content-center justify-between">
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
        <div className="w-[90%] flex content-center justify-center border border-gray-300 rounded-md">
          <input
            className=" "
            type="text"
            placeholder={isEditing ? currentGroup.name : " Nombre del grupo"}
            value={inputValue}
            onChange={(e) => onInputChange(e)}
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
            funcion={() => onSubmit()}
            disabled={
              inputValue.length > 30 || inputValue.length === 0 ? true : false
            }
          />
        </div>
      </div>
    </div>
  );
}
