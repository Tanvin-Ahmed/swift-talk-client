import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass, Plus } from "phosphor-react";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { ChatList } from "../../data";
import ChatElement from "../../components/Chat/ChatElement";
import CreateGroupDialog from "../../components/dialog/CreateGroupDialog";
import { useState } from "react";

const Group = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <>
      <Stack direction={"row"} width={"100%"}>
        {/* Left */}
        <Box
          sx={{
            height: "100vh",
            bgcolor: (theme) =>
              theme.palette.mode === "light"
                ? "#f8faff"
                : theme.palette.background,
            width: 320,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={2} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Stack>
              <Typography variant={"h5"}>Groups</Typography>
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search..." />
              </Search>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant={"subtitle2"} component={Link}>
                Create New Group
              </Typography>
              <IconButton onClick={handleOpenDialog}>
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />

            {/* chat List */}
            <Stack
              direction={"column"}
              spacing={3}
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
                  {ChatList.filter((c) => !c.pinned).map((chat) => (
                    <ChatElement key={chat.id} {...chat} />
                  ))}
                </Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>
        {/* Right */}
      </Stack>
      <CreateGroupDialog open={openDialog} handleClose={handleCloseDialog} />
    </>
  );
};

export default Group;
