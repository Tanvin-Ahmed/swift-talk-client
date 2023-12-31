import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  Users,
} from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { ChatList } from "../../data";
import { SimpleBarStyle } from "../../components/Scrollbar";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import ChatElement from "../../components/Chat/ChatElement";
import { useEffect, useState } from "react";
import SearchFriendDialog from "../../components/dialog/SearchFriend/SearchFriendDialog";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { storeConversions } from "../../redux/slices/conversation";

const Chats = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const { conversations } = useSelector(
    (state) => state.conversation.directChat
  );
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (socket) {
      socket.emit("get_direct_conversations", { userId }, (data) => {
        // data => list of conversations
        dispatch(storeConversions(data));
      });
    }
  }, [userId, dispatch]);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: 320,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#f8faff"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h5">Chats</Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <IconButton onClick={handleOpenDialog}>
                <Users />
              </IconButton>
              <IconButton>
                <CircleDashed />
              </IconButton>
            </Stack>
          </Stack>
          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search..." />
            </Search>
          </Stack>
          <Stack spacing={1}>
            <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
              <ArchiveBox size={24} />
              <Button>Archive</Button>
            </Stack>
            <Divider />
          </Stack>
          <Stack
            direction={"column"}
            sx={{ flexGrow: 1, overflowY: "auto", height: "100%" }}
          >
            <SimpleBarStyle timeout={500} clickOnTrack={false}>
              <Stack spacing={2.4}>
                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  Pinned
                </Typography>
                {ChatList.filter((e) => e.pinned).map((chat) => (
                  <ChatElement key={chat.id} {...chat} />
                ))}
              </Stack>
              <Box sx={{ margin: "16px 0" }} />
              <Stack spacing={2.4}>
                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  All Chats
                </Typography>
                {conversations
                  .filter((c) => !c.pinned)
                  .map((chat) => (
                    <ChatElement key={chat.id} {...chat} />
                  ))}
              </Stack>
            </SimpleBarStyle>
          </Stack>
        </Stack>
      </Box>
      {openDialog && (
        <SearchFriendDialog open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Chats;
