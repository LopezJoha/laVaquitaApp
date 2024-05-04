import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = "https://catfact.ninja/fact";

export default function Reto() {
  const [texto, setTexto] = useState();
  const [changedText, setChangedText] = useState();

  useEffect(() => {
    apiConexion();
  }, []);

  const apiConexion = async () => {
    axios
      .get(apiUrl)
      .then((response) => {
        const splitData = response.data.fact;
        setTexto(splitData);
        setChangedText(splitData);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  };

  function toReverse() {
    if (texto) {
      let textSplited = texto.split(" ");
      textSplited.reverse();
      textSplited.join(" ");
      let newText = "";
      textSplited.map((word) => {
        return (newText += word + " ");
      });
      console.log(newText);
      setChangedText(newText);
    }
  }

  function toSort() {
    if (changedText ? changedText : texto) {
      let textSplited = texto.split(" ");
      textSplited.sort();
      textSplited.join(" ");
      let newText = "";
      textSplited.map((word) => {
        return (newText += word + " ");
      });
      console.log(newText);
      setChangedText(newText);
    }
  }

  function toNormal() {
    setChangedText(texto);
    console.log(texto);
  }

  return (
    <div className="mt-20">
      <h1>{changedText}</h1>
      <div className="flex">
        <button className="w-[100px]" onClick={() => toReverse()}>
          Reverse
        </button>
        <button className="w-[100px]" onClick={() => toSort()}>
          Alphabetical
        </button>
        <button className="w-[100px]" onClick={() => toNormal()}>
          Normal
        </button>
      </div>
    </div>
  );
}
