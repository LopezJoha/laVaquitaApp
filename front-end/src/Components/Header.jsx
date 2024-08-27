import React, { useState } from "react";

import logo from "../assets/images/vaquita-nb.png";
import user from "../assets/images/user-48.png";

import { Link } from "react-router-dom";
import SignOutIcon from "../assets/images/SignOutIcon";

const routes = [
  {
    path: "/groups",
    label: "Grupos",
  },
  {
    path: "/friends",
    label: "Amigos",
  },
  {
    path: "/expenses",
    label: "Gastos",
  },
];

const routesMenu = [
  {
    path: "/my-account",
    label: "Mi Perfil",
  },
];

export default function Header({ children }) {
  const [active, setActive] = useState(0);

  const singOut = async (e) => {
    e.preventDefault();
    console.log("Sing Out");
    try {
      sessionStorage.removeItem("token");
      sessionStorage.clear();

      // Redirigir al usuario a la página de inicio de sesión
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="w-screen flex  lg:flex-row justify-between items-center bg-[#36190D] p-3 flex-wrap fixed top-0 left-0 z-10">
      <div className="logo flex items-end justify-around order-1 grow-0">
        <img src={logo} alt="logo" width={45} />
        <p className="text-center text-2xl lg:text-3xl ml-2 font-medium lg:font-extrabold text-white">
          Mi Vaquita
        </p>
      </div>

      <div className=" relativw grow-0 order-2 lg:order-3 h-fit p-1 bg-white rounded-[100px] cursor-pointer">
        <img
          src={user}
          alt="user"
          width={25}
          height={25}
          onClick={() => alert("Hola")}
        />
        <ul className="dropDownMenu">
          <li className="link">
            <Link to={"/my-account"}>Mi Perfi</Link>l
          </li>
          <li className="link">
            <SignOutIcon
              onClick={(e) => singOut(e)}
              height="30px"
              width="30px"
            />
          </li>
        </ul>
      </div>

      <div className=" w-screen lg:w-[50%] flex justify-between order-3 lg:order-2 mt-2">
        {routes.map((route, index) => (
          <Link to={route.path}>
            <div
              key={route.label}
              className={`w-full tab ${
                active === index ? "active" : ""
              } grow p-1.5 cursor-pointer text-center text-lg text-white`}
              onClick={() => setActive(index)}
            >
              {route.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
