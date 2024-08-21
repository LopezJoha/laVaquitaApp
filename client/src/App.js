import "./App.css";
import React, { useState } from "react";
import Login from "./Components/Login";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./Components/Auth/ProtectedRoute";
import HomePage from "./Components/Pages/HomePage";
import Groups from "./Components/Pages/Groups";
import Amigos from "./Components/Pages/Amigos";
import Gastos from "./Components/Pages/Gastos";
import MyAccountPage from "./Components/Pages/MyAccountPage";
import NotFoundPage from "./Components/Pages/NotFoundPage";
import { useAuth } from "./Components/hooks/useAuth";

function App() {

  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomePage />}>
            <Route path="/groups" element={<Groups />} />
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
