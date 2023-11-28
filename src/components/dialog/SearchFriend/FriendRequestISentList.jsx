import { startTransition, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriendRequestsISent } from "../../../redux/slices/app";
import { useTheme, styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import StyledBadge from "../../StyledBadge";
import { socket } from "../../../socket";
import { SyncLoader } from "react-spinners";
import { Search, SearchIconWrapper, StyledInputBase } from "../../Search";
import { MagnifyingGlass } from "phosphor-react";
import NotFoundPlaceholder from "../../Search/NotFoundPlaceholder";

const StyledChatBox = styled(Box)({
  "&:hover": {
    cursor: "pointer",
  },
});

const FriendRequestISentList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { friendRequestsISent } = useSelector((state) => state.app);

  const [searchKey, setSearchKey] = useState("");
  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    dispatch(fetchFriendRequestsISent(searchKey, 10, pageNo));
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
      {friendRequestsISent?.list?.length > 0
        ? friendRequestsISent?.list?.map((request) => (
            // request = {_id, sender: {_id, firstName, lastName, email}, recipient: {_id, firstName, lastName, email}}
            <StyledChatBox
              key={request?._id}
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
                  {request?.recipient?.status === "Online" ? (
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar
                        alt={request?.sender?.firstName}
                        src={request?.sender?.avatar}
                      />
                    </StyledBadge>
                  ) : (
                    <Avatar
                      alt={request?.sender?.firstName}
                      src={request?.sender?.avatar}
                    />
                  )}
                  <Stack spacing={0.3}>
                    <Typography variant="subtitle2">
                      {request?.recipient?.firstName +
                        " " +
                        request?.recipient?.lastName}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <Button
                    onClick={() => {
                      //  emit "cancel_request" event
                      socket.emit("cancel_request", {
                        requestId: request?._id,
                      });
                    }}
                  >
                    Cancel Request
                  </Button>
                </Stack>
              </Stack>
            </StyledChatBox>
          ))
        : !friendRequestsISent?.loading && <NotFoundPlaceholder show />}

      {friendRequestsISent?.loading ? (
        <Stack
          width={"100%"}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <SyncLoader size={16} color="dodgerblue" />
        </Stack>
      ) : (
        friendRequestsISent?.hasNext && (
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

export default FriendRequestISentList;
