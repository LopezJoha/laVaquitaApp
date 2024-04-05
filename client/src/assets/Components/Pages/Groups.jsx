import React from "react";
import Modal from "react-modal";
import Button from "../Button.jsx";
import { GroupsInfo } from "../../Constants/index.js";
import Group from "../Group.jsx";

export default function Groups({ valor, colour }) {
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
            <canvas></canvas>

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
        {GroupsInfo.map((group) => (
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
