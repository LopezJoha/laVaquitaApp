import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import SignOutIcon from "../../assets/images/SignOutIcon";

export default function HomePage() {
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
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
      <div class="fixed bottom-2 left-2">
        <SignOutIcon onClick={(e) => singOut(e)} height="30px" width="30px"  />
      </div>
    </div>
  );
}
