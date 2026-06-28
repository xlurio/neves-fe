import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { Link, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "~/lib/api";

interface NavBarProps {
  doShowLogout?: boolean;
}

export default function NavBar({ doShowLogout = false }: NavBarProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await api.post("/api/logout");
    queryClient.clear();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">Home</Link>
        <Link to="/practice/radicals">Radicals</Link>
        {doShowLogout && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
