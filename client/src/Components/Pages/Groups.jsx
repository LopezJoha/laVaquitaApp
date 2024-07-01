import React, { useState, useEffect } from "react";

import Modal from "../Modal.jsx";
import DeleteModal from "../DeleteModal.jsx";
import Button from "../Button.jsx";
import Group from "../Group.jsx";
import axios from "axios";
import Header from "../Header.jsx";

const baseUrl = "http://localhost:3001/groups";

export default function Groups({ valor, colour }) {
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    serverConexion();
  }, []);

  const serverConexion = async () => {
    axios
      .get(baseUrl)
      .then((response) => {
        console.log(response.data.groups);
        setGroups(response.data.groups);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  };

  const fruta = (e, group) => {
    setIsModalOpen(true);
    setCurrentGroup(group);
    setIsEditing(true);
  };

  const Mango = (e, group) => {
    setIsDeleteModalOpen(true);
    setCurrentGroup(group);
  };

  const resetModalState = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentGroup(null);
  };

  return (
    <div className="w-full relative p-10 mt-10">
      <div className="absolute top-5 right-10">
        <Button text={"Nuevo Grupo"} funcion={() => setIsModalOpen(true)} />
        {isModalOpen ? (
          <Modal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            closeModal={() => resetModalState()}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            groups={groups}
            setGroups={setGroups}
            currentGroup={currentGroup}
          />
        ) : (
          <DeleteModal
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            currentGroup={currentGroup}
            groups={groups}
            setGroups={setGroups}
          />
        )}
      </div>
      <div>
        <p className="text-lg">
          Debes: <br></br>
          <span className="text-3xl font-semibold text-red-600">${valor}</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap md:content-center justify-around">
        {groups.map((group, index) => {
          return (
            <Group
              key={group.name}
              group={group}
              funcionEditar={fruta}
              funcionEliminar={Mango}
            />
          );
        })}
      </div>
    </div>
  );
}
