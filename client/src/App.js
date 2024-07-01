import "./App.css";
import React, { useState } from "react";
import Login from "./Components/Login";
import Header from "./Components/Header";
import Groups from "./Components/Pages/Groups";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import HomePage from "./Components/Pages/HomePage";
import Amigos from "./Components/Pages/Amigos";
import Gastos from "./Components/Pages/Gastos";
import MyAccountPage from "./Components/Pages/MyAccountPage";
import NotFoundPage from "./Components/Pages/NotFoundPage";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <Groups />
            </ProtectedRoute>
          }
        />
        <Route
          path="/friends"
          element={
            <ProtectedRoute>
              <Amigos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Gastos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-account"
          element={
            <ProtectedRoute>
              <MyAccountPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
