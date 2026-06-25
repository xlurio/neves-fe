import { Outlet } from "react-router";
import NavBar from "~/components/NavBar";

export default function AuthLayout() {
  return (
    <>
      <NavBar showLogout={false} />
      <Outlet />
    </>
  );
}
