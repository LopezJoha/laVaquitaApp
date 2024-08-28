import React, { useState, useEffect } from "react";

import Modal from "../Modal.jsx";
import DeleteModal from "../DeleteModal.jsx";
import Button from "../Ui/Button.jsx";
import Group from "../Group.jsx";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import GrupoInfo from "./GrupoInfo.jsx";
import { Outlet, Navigate } from "react-router-dom";

const baseUrl = "http://localhost:3001/groups";

export default function Groups({ valor }) {
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [verGrupoInfo, setVerGrupoInfo] = useState(false);
  const [ownerUserId, setOwnerUserId] = useState(
    useSelector((state) => state.userReducer.userId)
  );

  useEffect(() => {
    getGroupsByOwnerId();
  }, []);

  const getGroupsByOwnerId = async () => {
    console.log(ownerUserId);
    axios
      .get(`http://localhost:3001/groups/${ownerUserId}/owner`)
      .then((response) => {
        console.log(response.data);
        setGroups(response.data.result);
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

  const handleNavigate = (e, group) => {
    e.preventDefault();
    setCurrentGroup(group);
    setVerGrupoInfo(true);
  };

  return (
    <div className="w-full relative p-2 ">
      {verGrupoInfo && currentGroup ? (
        <div>
          <Navigate to={`groups/${currentGroup.id}`} />
          <GrupoInfo group={currentGroup} />
        </div>
      ) : (
        <div className="InfoGrupos">
          <div className="flex flex-col">
            <h2 className="font-plus-jakarta text-3xl lg:text-4xl font-medium text-[#582B1C]">
              Listado de Grupos:
            </h2>
          </div>
          <div className="absolute top-0 right-0">
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
                  handleNavigate={handleNavigate}
                />
              );
            })}
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
}
