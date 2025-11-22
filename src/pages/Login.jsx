import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import api from "../api/api";
import { saveAuth } from "../utlis/auth.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });

      

      let token = res.data.token || res.data.accessToken;
      let user = res.data.user || res.data.data || {};
      

      if (!user.role && token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          user = {
            ...user,
            userId: payload.userId || payload.id || payload._id,
            email: payload.email || email,
            role: payload.role
          };
        } catch (decodeErr) {
          console.error("Token decode error:", decodeErr);
        }
      }
      

      if (!user.role && res.data) {
        user = {
          ...user,
          userId: res.data.userId || res.data.id || res.data._id,
          email: res.data.email || email,
          role: res.data.role
        };
      }
      
      if (!token) {
        throw new Error("No token received from server");
      }
      
      if (!user || !user.role) {
        throw new Error("User data or role not found in response");
      }
      

      const normalizedRole = (user.role || "").toLowerCase();
      
      saveAuth(token, user);
      

      const dashboardPath = normalizedRole === "manager" ? "/manager" : "/engineer";
      console.log("Navigating to:", dashboardPath, "for role:", normalizedRole);
      navigate(dashboardPath, { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <Paper sx={{ maxWidth: 480, mx: "auto", p: 3 }}>
      <Typography variant="h5" gutterBottom>Sign in</Typography>
      <Box component="form" onSubmit={submit} sx={{ display: "grid", gap: 2 }}>
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <Button type="submit" variant="contained">Login</Button>
      </Box>
    </Paper>
  );
}