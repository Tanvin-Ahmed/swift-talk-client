import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { connectSocket, socket } from "../../socket";
import toast from "react-hot-toast";
import { updateFriedRequestList, updateUserList } from "../../redux/slices/app";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && userId) {
      connectSocket(userId);

      if (socket) {
        socket.on("new_friend_request", (data) => {
          toast.success(data.message);
          dispatch(updateUserList(data.userId));
        });

        socket.on("friend_request_sent", (data) => {
          toast.success(data.message);
          dispatch(updateUserList(data.userId));
        });

        socket.on("friend_request_accepted", (data) => {
          toast.success(data.message);
          dispatch(updateFriedRequestList(data.requestId));
        });

        socket.on("cancel_request_by_me", (data) => {
          toast.success(data.message);
          dispatch(updateFriedRequestList(data.requestId));
        });
        socket.on("cancel_request_by_sender", (data) => {
          toast.success(data.message);
          dispatch(updateFriedRequestList(data.requestId));
        });
      }
    }

    return () => {
      if (socket) {
        socket.off("new_friend_request");
        socket.off("friend_request_sent");
        socket.off("friend_request_accepted");
        socket.off("cancel_request_by_sender");
        socket.off("cancel_request_by_me");
      }
    };
  }, [userId, isLoggedIn, dispatch]);

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
