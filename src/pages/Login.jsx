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
      const res = await api.post("http://localhost:8000/login", { email, password });
      const { token, user } = res.data;
      saveAuth(token, user);
      navigate(user.role === "manager" ? "/manager" : "/engineer");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
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