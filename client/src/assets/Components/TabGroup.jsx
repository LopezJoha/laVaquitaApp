import React from "react";

export default function TabGroup({ active, setActive, tabs }) {
  return (
    <div className=" w-screen lg:w-[40%] flex order-3 lg:order-2 mt-2">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`tab ${
            active === tab ? "active" : ""
          } grow p-1.5 cursor-pointer text-center text-lg text-white`}
          onClick={() => setActive(tab)}
        >
          {tab}
        </div>
      ))}
      <div></div>
    </div>
  );
}
