import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import SignOutIcon from "../../assets/images/SignOutIcon";

export default function HomePage() {
  
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
      <div className="fixed bottom-2 left-2">
        
      </div>
    </div>
  );
}
