import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import NavBar from "~/components/NavBar";
import { useCurrentUserQuery } from "~/hooks/useCurrentUserQuery";
import { UnauthenticatedError } from "~/lib/errors";

export default function ProtectedLayout() {
  const { error, isPending } = useCurrentUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (error instanceof UnauthenticatedError) {
      navigate("/login");
    }
  }, [error, navigate]);

  if (isPending) {
    return null;
  }

  return (
    <>
      <NavBar showLogout />
      <Outlet />
    </>
  );
}
