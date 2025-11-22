import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import api from "../api/api";

export default function DefectList({ defects, refresh, isManager }) {
  const closeDefect = async (id) => {
    try {
      await api.patch(`/defects/${id}/close`);
      refresh();
    } catch (e) {
      console.error(e);
      alert("Failed to close defect");
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Equipment</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Raised At</TableCell>
          {isManager && <TableCell>Actions</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {defects.map(d => (
          <TableRow key={d._id || d.defectId}>
            <TableCell>{d.equipmentId}</TableCell>
            <TableCell>{d.description}</TableCell>
            <TableCell>{d.status}</TableCell>
            <TableCell>{new Date(d.createdAt).toLocaleString()}</TableCell>
            {isManager && (
              <TableCell>
                {d.status === "open" && <Button size="small" onClick={() => closeDefect(d.defectId || d._id)}>Close</Button>}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}