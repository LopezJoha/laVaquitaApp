import React from "react";
import { useParams } from "react-router-dom";

function GrupoInfo({ group }) {
  if (!group) {
    return <p>Grupo no encontrado</p>;
  }

  return (
    <div>
      <h1>{group.name}</h1>
      <p>
        Deuda: {group.debt} - {group.valor}
      </p>
      <p>Participantes: {group.amigos}</p>
      {/* Puedes agregar más detalles del grupo aquí */}
    </div>
  );
}

export default GrupoInfo;
