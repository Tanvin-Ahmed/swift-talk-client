import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import SideBar from "./SideBar";

const userIsAuthenticated = true;

const DashboardLayout = () => {
  if (!userIsAuthenticated) {
    return <Navigate to={"/auth/login"} />;
  }
  return (
    <>
      <Stack direction={"row"}>
        <SideBar />
        <Outlet />
      </Stack>
    </>
  );
};

export default DashboardLayout;
