import { AppBar, Box, Toolbar, Typography} from "@mui/material";

import { useState, useEffect } from "react";


import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../main";
import { useNavigate } from "react-router-dom";
import UserCircle from "./UserCircle"


export default function Header() {
  const navigate = useNavigate();
  const [statusUser, setStatusUser] = useState(false);
  const userStatus = useSelector((state:RootState) => state.user.status);

  useEffect(() => {
    setStatusUser(userStatus);
  }, [userStatus]);
  return (
    <Box sx={{ flexGrow: 1, minHeight: "0px" }}>
      <AppBar position="static" sx={{ background: "white" }}>
        <Toolbar sx={{ background: "" }}>
          <Typography color="primary" variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Order Management
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <UserCircle />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}