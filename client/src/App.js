import "./App.css";
import React, { useState } from "react";
import Header from "./assets/Components/Header";
import Grupos from "./assets/Components/Pages/Grupos";

const TABS = ["Amigos", "Gastos", "Grupos"];

function App() {
  const [active, setActive] = useState(TABS[0]);
  return (
    <>
      <Header active={active} setActive={setActive} tabs={TABS} />
      <p />
      <p> Página Seleccionada: {active} </p>
      <Grupos valor={45000}/>
    </>
  );
}

export default App;
