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

export default function EngineerDashboard() {
  const [equipments, setEquipments] = useState([]);
  const [defects, setDefects] = useState([]);
  const [equipmentId, setEquipmentId] = useState("");
  const [description, setDescription] = useState("");

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

  const raise = async () => {
    if (!equipmentId || !description) return alert("Fill fields");
    try {
      await api.post("/defects", { equipmentId, description });
      setDescription("");
      setEquipmentId("");
      load();
    } catch (e) {
      console.error(e);
      alert("Failed to raise defect");
    }
  };

  return (
    <>
      <Navbar />
      <Typography variant="h4" gutterBottom>Engineer Dashboard</Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Raise Defect</Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
          <TextField
            label="Equipment Id"
            value={equipmentId}
            onChange={e => setEquipmentId(e.target.value)}
            select={false}
            placeholder="paste equipmentId from equipment list"
          />
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={raise}>Raise</Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Equipment List</Typography>
        <EquipmentList equipments={equipments} refresh={load} isManager={false} />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Defect Reports</Typography>
        <DefectList defects={defects} refresh={load} isManager={false} />
      </Paper>
    </>
  );
}