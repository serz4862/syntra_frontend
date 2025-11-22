import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import EquipmentList from "../components/EquipmentList";
import DefectList from "../components/DefectList";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ManagerDashboard() {
  const [equipments, setEquipments] = useState([]);
  const [defects, setDefects] = useState([]);
  const [name, setName] = useState("");

  const load = async () => {
    try {
      const eq = await api.get("/equipment");
      setEquipments(eq.data);
      const df = await api.get("/defects");
      setDefects(df.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { load(); }, []);

  const addEquipment = async () => {
    if (!name) return alert("Name required");
    try {
      await api.post("/equipment", { name });
      setName("");
      load();
    } catch (e) {
      console.error(e);
      alert("Failed to add");
    }
  };

  return (
    <>
      <Navbar />
      <Typography variant="h4" gutterBottom>Manager Dashboard</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Add Equipment</Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
          <TextField label="Equipment name" value={name} onChange={e => setName(e.target.value)} />
          <Button variant="contained" onClick={addEquipment}>Add</Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Equipment List</Typography>
        <EquipmentList equipments={equipments} refresh={load} isManager />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Defect Reports</Typography>
        <DefectList defects={defects} refresh={load} isManager />
      </Paper>
    </>
  );
}