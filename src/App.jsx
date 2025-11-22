import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Login from "./pages/Login";
// import ManagerDashboard from "./pages/ManagerDashboard";
// import EngineerDashboard from "./pages/EngineerDashboard";
import { getUserFromStorage } from "./utlis/auth.js";
import ManagerDashboard from "./pages/ManagerDashboard";
import EngineerDashboard from "./pages/EnginnerDashboard";

export default function App() {
  const user = getUserFromStorage();
  const userRole = user?.role?.toLowerCase();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to={user ? (userRole === "manager" ? "/manager" : "/engineer") : "/login"} replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manager" element={user && userRole === "manager" ? <ManagerDashboard /> : <Navigate to="/login" replace />} />
          <Route path="/engineer" element={user && userRole === "engineer" ? <EngineerDashboard /> : <Navigate to="/login" replace />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Container>
    </>
  );
}