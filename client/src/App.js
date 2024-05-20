import "./App.css";
import React, { useState } from "react";
//import Header from "./assets/Components/Header";
//import Groups from "./assets/Components/Pages/Groups";
import Login from "./assets/Components/Login";

//const TABS = ["Amigos", "Gastos", "Grupos"];

function App() {
  //const [active, setActive] = useState(TABS[2]);

  return (
    /*
    <>
      <Header active={active} setActive={setActive} tabs={TABS} />

      <p> Página Seleccionada: {active} </p>
      {active === "Grupos" ? <Groups valor={45000} /> : null}
    </>*/
    <Login />
  );
}

export default App;
