import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import api from "../api/api";
import { getUserFromStorage } from "../utlis/auth.js";

export default function NotificationsDrawer() {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const user = getUserFromStorage();

  const fetchNotes = async () => {
    if (!user) return;
    try {
      const res = await api.get(`/notifications/${user.userId}`);
      setNotes(res.data || []);
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    fetchNotes();
    const t = setInterval(fetchNotes, 6000);
    return () => clearInterval(t);
  }, []);

  const unreadCount = notes.filter(n => !n.isRead).length;

  return (
    <>
      <IconButton color="inherit" onClick={() => { setOpen(true); }}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 360, p: 2 }}>
          <Typography variant="h6">Notifications</Typography>
          {notes.length === 0 && <Typography sx={{ mt: 2 }}>No notifications</Typography>}
          {notes.map((n, i) => (
            <ListItem key={i} divider>
              <div>
                <Typography variant="body2">{n.message}</Typography>
                <Typography variant="caption" color="text.secondary">{new Date(n.createdAt).toLocaleString()}</Typography>
              </div>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}