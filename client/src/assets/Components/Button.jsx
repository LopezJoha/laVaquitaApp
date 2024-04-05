import React from "react";

export default function Button({ text, funcion }) {
  return (
    <button
      className="bg-[#36190D] p-2 px-3.5 text-white rounded-lg"
      onClick={funcion}
    >
      {text}
    </button>
  );
}
