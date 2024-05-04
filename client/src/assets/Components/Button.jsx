import React from "react";

export default function Button({ text, funcion, disabled }) {
  return (
    <button
      className={` ${
        disabled
          ? "bg-[#d1c1ba] cursor-not-allowed"
          : "bg-[#36190D] cursor-pointer"
      } p-2 px-3.5 text-white rounded-lg`}
      onClick={funcion}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
