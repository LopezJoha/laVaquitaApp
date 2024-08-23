import React from "react";
import Button from "./Ui/Button";
import close from "../assets/images/close.png";

import axios from "axios";

export default function DeleteModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  groups,
  setGroups,
  currentGroup,
}) {
  const deleteGroup = async (id, group) => {
    axios({
      method: "delete",
      url: `http://localhost:3001/groups/${id}`,
      data: group,
    })
      .then((response) => {
        setGroups((prevGroups) => {
          let copy = [...prevGroups];
          let groupIndex = copy.findIndex((group) => {
            return group.id === id;
          });
          console.log(groupIndex);
          if (groupIndex >= 0) {
            copy.splice(groupIndex, 1);
          }
          return copy;
        });

        setIsDeleteModalOpen(false);
        alert("Grupo Eliminado con exito!");
      })
      .catch((error) => {
        console.error("Error actualizando el grupo", error);
        console.log(error.response.data.message);
      });
  };
  const onSubmit = async (e) => {
    if (e.target.innerText === "Eliminar") {
      deleteGroup(currentGroup.id, currentGroup);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  if (!isDeleteModalOpen) {
    return null;
  }
  return (
    <div className=" w-screen h-screen fixed top-0 left-0 bg-gray-200/50 flex content-center justify-center z-50">
      <div className="w-[500px] h-[100%] md:h-[15%] relative bg-white min-h-[250px] shadow-lg p-10 mt-10 flex flex-col content-center justify-between">
        <img
          className="absolute top-5 right-5 cursor-pointer w-[20px] h-[20px] "
          src={close}
          alt="close"
          onClick={() => setIsDeleteModalOpen(false)}
        />
        <h3 className="text-center">{`Está seguro que desea eliminar el ${currentGroup.name} ?`}</h3>

        <div className="flex justify-center content-center gap-x-5">
          <Button text={"Eliminar"} funcion={(e) => onSubmit(e)} />
          <Button text={"Cancelar"} funcion={(e) => onSubmit(e)} />
        </div>
      </div>
    </div>
  );
}
