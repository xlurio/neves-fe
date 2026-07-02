import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "~/lib/api";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

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
        <Stack direction="row" spacing="1em" sx={{ width: "100%" }}>
          <Link color="inherit" underline="none" href="/">
            Home
          </Link>
          <Link color="inherit" underline="none" href="/practice/radicals">
            Radicals
          </Link>
          <Link color="inherit" underline="none" href="/practice/ngrams">
            Ngrams
          </Link>
        </Stack>
        {doShowLogout && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
