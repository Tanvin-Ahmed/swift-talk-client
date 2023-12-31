import { startTransition, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  userListAfterSendFriendRequest,
} from "../../../redux/slices/app";
import { useTheme, styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import StyledBadge from "../../StyledBadge";
import toast from "react-hot-toast";
import { socket } from "../../../socket";
import { Search, SearchIconWrapper, StyledInputBase } from "../../Search";
import { MagnifyingGlass } from "phosphor-react";
import { SyncLoader } from "react-spinners";
import NotFoundPlaceholder from "../../Search/NotFoundPlaceholder";

const StyledChatBox = styled(Box)({
  "&:hover": {
    cursor: "pointer",
  },
});

const UserList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.app);
  const { userId } = useSelector((state) => state.auth);

  const [pageNo, setPageNo] = useState(0);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    dispatch(fetchUsers(searchKey, 10, pageNo));
  }, [dispatch, searchKey, pageNo]);

  const handleSendFriendRequest = (from, to) => {
    socket.emit("friend_request", { from, to }, () => {
      toast.success("request sent");
      dispatch(userListAfterSendFriendRequest(to));
    });
  };

  const handleSearch = (event) => {
    startTransition(() => {
      setSearchKey(event.target.value);
    });
  };

  const handleGoToNextPage = () => {
    setPageNo((prev) => ++prev);
  };

  return (
    <Box>
      <Stack direction={"row"} width={"100%"}>
        <Search>
          <SearchIconWrapper>
            <MagnifyingGlass color="#709CE6" />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search..." onChange={handleSearch} />
        </Search>
      </Stack>
      {users?.list?.length > 0
        ? users?.list?.map((user) => (
            <StyledChatBox
              key={user._id}
              sx={{
                width: "100%",
                borderRadius: 1,
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "#fff"
                    : theme.palette.background.default,
              }}
              p={2}
              my={2}
            >
              <Stack
                direction="row"
                alignItems={"center"}
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems={"center"} spacing={2}>
                  {user?.status === "Online" ? (
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar alt={user?.firstName} src={user?.avatar} />
                    </StyledBadge>
                  ) : (
                    <Avatar alt={user?.firstName} src={user?.avatar} />
                  )}
                  <Stack spacing={0.3}>
                    <Typography variant="subtitle2">
                      {user?.firstName + " " + user?.lastName}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <Button
                    onClick={() => handleSendFriendRequest(userId, user?._id)}
                  >
                    Send Request
                  </Button>
                </Stack>
              </Stack>
            </StyledChatBox>
          ))
        : !users?.loading && <NotFoundPlaceholder show />}
      {users?.loading ? (
        <Stack
          width={"100%"}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <SyncLoader size={16} color="dodgerblue" />
        </Stack>
      ) : (
        users?.hasNext && (
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Button size="small" onClick={handleGoToNextPage}>
              More...
            </Button>
          </Stack>
        )
      )}
    </Box>
  );
};

export default UserList;
