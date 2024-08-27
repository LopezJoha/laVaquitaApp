import React, { useState, useEffect } from "react";

import Modal from "../Modal.jsx";
import DeleteModal from "../DeleteModal.jsx";
import Button from "../Ui/Button.jsx";
import Group from "../Group.jsx";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const baseUrl = "http://localhost:3001/groups";

export default function Groups({ valor }) {
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState();
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [ownerUserId, setOwnerUserId] = useState(
    useSelector((state) => state.userReducer.userId)
  );

  useEffect(() => {
    serverConexion();
  }, []);

  const serverConexion = async () => {
    axios
      .get(baseUrl)
      .then((response) => {
        setGroups(response.data.groups);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  };

  const toEdit = (e, group) => {
    setIsModalOpen(true);
    setCurrentGroup(group);
    setIsEditing(true);
  };

  const toEliminate = (e, group) => {
    setIsDeleteModalOpen(true);
    setCurrentGroup(group);
  };

  const resetModalState = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentGroup(null);
  };

  const createGroup = async (newGroup) => {
    console.log(newGroup);
    axios({
      method: "post",
      url: baseUrl,
      data: newGroup,
    })
      .then((response) => {
        console.log(response.data.group);
        setGroups([...groups, response.data.group]);
        setError(false);
        setMessageError("");
        setInputValue("");
        alert("Grupo Creado con exito!!!");
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error creando el grupo", error);
        console.log(error.response.data.message);
        setError(true);
        setMessageError(error.response.data.message);
      });
  };

  const editGroup = async (id, group) => {
    console.log(group);
    axios({
      method: "put",
      url: `http://localhost:3001/groups/${id}`,
      data: group,
    })
      .then((response) => {
        setGroups((prevGroups) => {
          const updatedGroups = prevGroups.map((g) =>
            g.id === id ? response.data.group : g
          );
          return updatedGroups;
        });

        setInputValue("");
        alert("Grupo Modificado con exito!");
        setIsModalOpen(false);
        setIsEditing(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setError(true);
        setMessageError(error.response.data.message);
      });
  };

  const toSendInfo = async (inputValue, active) => {
    if (!isEditing) {
      await createGroup({
        userid: ownerUserId,
        owneruserid: ownerUserId,
        name: inputValue,
        color: active,
      });
    } else {
      await editGroup(currentGroup.id, { name: inputValue, color: active });
    }
  };

  return (
    <div className="w-full h-[100%] relative p-2 mt-[100px]">
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
            onSubmit={toSendInfo}
            createGroup={createGroup}
            editGroup={editGroup}
            error={error}
            setError={setError}
            messageError={messageError}
            setMessageError={setMessageError}
            inputValue={inputValue}
            setInputValue={setInputValue}
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
          {valor ? "Debes:" : ""} <br></br>
          <span className="text-3xl font-semibold text-red-600">
            {valor ? `  $ ${valor}` : ""}
          </span>
        </p>
      </div>
      <div className="mt-[50px] flex flex-col md:flex-row md:flex-wrap md:content-center justify-around items-center gap-3">
        {groups.map((group, index) => {
          return (
            <Group
              key={group.name}
              group={group}
              funcionEditar={toEdit}
              funcionEliminar={toEliminate}
            />
          );
        })}
      </div>
    </div>
  );
}
