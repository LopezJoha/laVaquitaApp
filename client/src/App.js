import "./App.css";
import React, { useState } from "react";
import Header from "./assets/Components/Header";
import Groups from "./assets/Components/Pages/Groups";

const TABS = ["Amigos", "Gastos", "Grupos"];

function App() {
  const [active, setActive] = useState(TABS[0]);

  return (
    <>
      <Header active={active} setActive={setActive} tabs={TABS} />
      <p />
      <p> Página Seleccionada: {active} </p>
      {
        active === "Grupos" ? 
        <Groups valor={45000} /> : null
      }
    </>
  );
}

export default App;
