import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { clearAuth, getUserFromStorage } from "../utlis/auth.js";
import NotificationsDrawer from "./NotificationDrawer.jsx";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getUserFromStorage();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Equipment Maintenance — {user?.role?.toUpperCase() || "Guest"}
        </Typography>

        <NotificationsDrawer />
        {user ? (
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        ) : (
          <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}