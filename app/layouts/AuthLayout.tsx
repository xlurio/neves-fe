import { Outlet } from "react-router";
import MainContainer from "~/components/MainContainer";
import NavBar from "~/components/NavBar";

export default function AuthLayout() {
  return (
    <>
      <NavBar doShowLogout={false} />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
}
