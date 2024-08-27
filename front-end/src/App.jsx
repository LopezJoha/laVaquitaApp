import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Components/Login";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./Components/Auth/ProtectedRoute";
import HomePage from "./Components/Pages/HomePage";
import Grupos from "./Components/Pages/Grupos";
import Amigos from "./Components/Pages/Amigos";
import Gastos from "./Components/Pages/Gastos";
import MyAccountPage from "./Components/Pages/MyAccountPage";
import NotFoundPage from "./Components/Pages/NotFoundPage";
import { useAuth } from "./Components/hooks/useAuth";

function App() {
  useEffect(() => {
    const setVh = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
    };
  }, []);

  return (
    <div className="mainCointainerApp overflow-y-auto">
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomePage />}>
            <Route path="/groups" element={<Grupos />} />
            <Route path="/friends" element={<Amigos />} />
            <Route path="/expenses" element={<Gastos />} />
            <Route path="/my-account" element={<MyAccountPage />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
