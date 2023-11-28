import { startTransition, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "../../../redux/slices/app";
import { useTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import StyledBadge from "../../StyledBadge";
import { socket } from "../../../socket";
import { Chat, MagnifyingGlass } from "phosphor-react";
import { Search, SearchIconWrapper, StyledInputBase } from "../../Search";
import NotFoundPlaceholder from "../../Search/NotFoundPlaceholder";
import { SyncLoader } from "react-spinners";

const StyledChatBox = styled(Box)({
  "&:hover": {
    cursor: "pointer",
  },
});

const FriendList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.app);
  const { userId } = useSelector((state) => state.auth);

  const [searchKey, setSearchKey] = useState("");
  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    dispatch(fetchFriends(searchKey, 10, pageNo));
  }, [dispatch, searchKey, pageNo]);

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
      {friends?.list?.length > 0
        ? friends?.list?.map((user) => (
            <StyledChatBox
              key={user?._id}
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
                  <IconButton
                    onClick={() => {
                      // start a new conversation
                      socket.emit("start_conversation", {
                        to: user?._id,
                        from: userId,
                      });
                    }}
                  >
                    <Chat />
                  </IconButton>
                </Stack>
              </Stack>
            </StyledChatBox>
          ))
        : !friends?.loading && <NotFoundPlaceholder show />}

      {friends?.loading ? (
        <Stack
          width={"100%"}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <SyncLoader size={16} color="dodgerblue" />
        </Stack>
      ) : (
        friends?.hasNext && (
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

export default FriendList;
