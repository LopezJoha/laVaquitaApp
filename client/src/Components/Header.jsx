import React, { useState } from "react";

import logo from "../assets/images/vaquita-nb.png";
import user from "../assets/images/user-48.png";

import { Link } from "react-router-dom";

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

export default function Header({ children }) {
  const [active, setActive] = useState(0);

  return (
    <div className="w-screen flex  lg:flex-row justify-between bg-[#36190D] p-3 flex-wrap">
      <div className="logo flex items-end justify-around order-1 grow-0">
        <img src={logo} alt="logo" width={45} />
        <p className="text-center text-2xl lg:text-3xl ml-2 font-medium lg:font-extrabold text-white">
          Mi Vaquita
        </p>
      </div>

      <div className=" grow-0 order-2 lg:order-3 h-fit p-1 bg-white rounded-[100px]">
        <img src={user} alt="user" width={25} height={25} />
      </div>
      <div className=" w-screen lg:w-[40%] flex order-3 lg:order-2 mt-2">
        {routes.map((route, index) => (
          <Link to={route.path}>
            <div
              key={route.label}
              className={`tab ${
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
