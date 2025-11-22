import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import api from "../api/api";

export default function EquipmentList({ equipments, refresh, isManager }) {
  const changeStatus = async (id, nextStatus) => {
    try {
      await api.patch(`/equipment/${id}/status`, { status: nextStatus });
      refresh();
    } catch (e) {
      console.error(e);
      alert("Failed to update status");
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Last Service</TableCell>
          {isManager && <TableCell>Actions</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {equipments.map(eq => (
          <TableRow key={eq._id || eq.equipmentId}>
            <TableCell>{eq.name}</TableCell>
            <TableCell>{eq.currentStatus || eq.status}</TableCell>
            <TableCell>{eq.lastServiceDate ? new Date(eq.lastServiceDate).toLocaleString() : "-"}</TableCell>
            {isManager && (
              <TableCell>
                {eq.currentStatus !== "serviced" && (
                  <>
                    <Button size="small" onClick={() => changeStatus(eq.equipmentId || eq._id, "serviced")}>Mark Serviced</Button>
                    <Button size="small" onClick={() => changeStatus(eq.equipmentId || eq._id, "defective")}>Mark Defective</Button>
                  </>
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}