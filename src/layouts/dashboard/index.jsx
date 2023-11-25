import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { connectSocket, socket } from "../../socket";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const { isLoggedIn, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && userId) {
      connectSocket(userId);

      if (socket) {
        socket.on("new_friend_request", (data) => {
          toast.success(data.message);
        });

        socket.on("friend_request_sent", (data) => {
          toast.success(data.message);
        });

        socket.on("friend_request_accepted", (data) => {
          toast.success(data.message);
        });
      }
    }

    return () => {
      socket.off("new_friend_request");
      socket.off("friend_request_sent");
      socket.off("friend_request_accepted");
    };
  }, [userId, isLoggedIn]);

  if (!isLoggedIn) {
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
