import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Login from "./pages/Login";
// import ManagerDashboard from "./pages/ManagerDashboard";
// import EngineerDashboard from "./pages/EngineerDashboard";
import { getUserFromStorage } from "../src/utlis/auth.js";
import ManagerDashboard from "./pages/ManagerDashboard";
import EngineerDashboard from "./pages/EnginnerDashboard";

export default function App() {
  const user = getUserFromStorage();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to={user ? (user.role === "manager" ? "/manager" : "/engineer") : "/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manager" element={user ? (user.role === "manager" ? <ManagerDashboard /> : <Navigate to="/login" />) : <Navigate to="/login" />} />
          <Route path="/engineer" element={user ? (user.role === "engineer" ? <EngineerDashboard /> : <Navigate to="/login" />) : <Navigate to="/login" />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Container>
    </>
  );
}