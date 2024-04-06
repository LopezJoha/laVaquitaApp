import React, { useState, useEffect } from "react";

import Modal from "react-modal";
import Button from "../Button.jsx";
//import { GroupsInfo } from "../../Constants/index.js";
import Group from "../Group.jsx";

export default function Groups({ valor, colour }) {

  const [groups, setGroups] = useState([]);

 // Paso 3: Utiliza useEffect para realizar la solicitud de datos
 useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:3001/groups');
        const data = await response.json();
        setGroups(data); // Actualiza el estado con los grupos obtenidos
      } catch (error) {
        console.error('Error al obtener los grupos:', error);
      }
    };

    fetchGroups();
 }, []); 
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="w-full relative p-10 mt-10">
      <div className="absolute top-5 right-10">
        <Button text={"Nuevo Grupo"} funcion={openModal} />
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>Nuevo Grupo</h2>
          <button onClick={closeModal}>close</button>
          <form>
            <div>
              <input placeholder="Nombre del grupo" />
              <icon></icon>
            </div>
            <div className="flex w-full">
              <div className="w-10 h-10 border-2 border-black border-solid"></div>
              <div className="w-10 h-10 border-2 border-black border-solid"></div>
              <div className="w-10 h-10 border-2 border-black border-solid"></div>
              <div className="w-10 h-10 border-2 border-black border-solid"></div>
              <div className="w-10 h-10 border-2 border-black border-solid"></div>
              <div className="w-10 h-10 border-2 border-black border-solid"></div>
            </div>

            <button>Enviar</button>
          </form>
        </Modal>
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
