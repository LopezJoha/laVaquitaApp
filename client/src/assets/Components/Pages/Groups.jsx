import React, { useState, useEffect } from "react";

import Modal from "../Modal.jsx";
import Button from "../Button.jsx";
import Group from "../Group.jsx";
import axios from "axios";

const baseUrl = "http://localhost:3001/groups";

export default function Groups({ valor, colour }) {
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Paso 3: Utiliza useEffect para realizar la solicitud de datos
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

  const createGroup = async () => {
    axios
      .post(baseUrl, { id: "5", name: "Grupo # 5", bgColour: "red" })
      .then((response) => {
        setGroup(response.data);
      });
  };

  return (
    <div className="w-full relative p-10 mt-10">
      <div className="absolute top-5 right-10">
        <Button text={"Nuevo Grupo"} funcion={() => setIsModalOpen(true)} />
        <Modal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          fnCreateGroup={createGroup}
        />
      </div>
      <div>
        <p className="text-lg">
          Debes: <br></br>
          <span className="text-3xl font-semibold text-red-600">${valor}</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap md:content-center justify-around">
        {groups.map((group) => (
          <Group
            debt={group.debt}
            name={group.name}
            valor={group.valor}
            amigos={group.amigos}
            textDebt={group.textDebt}
            bgColour={group.bgColour}
          />
        ))}
      </div>
    </div>
  );
}
