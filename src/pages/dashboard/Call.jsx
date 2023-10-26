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
import { useState } from "react";
import CallLogElement from "../../components/call/CallLogElement";
import { CallLogList } from "../../data";
import StartCallDialog from "../../components/dialog/call/StartCallDialog";

const Call = () => {
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
            position: "relative",
            width: 320,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#f8faff"
                : theme.palette.background.paper,
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
                Start Conversation
              </Typography>
              <IconButton onClick={handleOpenDialog}>
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />

            {/* Call Logs */}
            <Stack spacing={3} sx={{ overflowY: "auto", flexGrow: 1 }}>
              {CallLogList.map((log) => (
                <CallLogElement key={log.id} {...log} />
              ))}
            </Stack>
          </Stack>
        </Box>
        {/* Right */}
      </Stack>
      <StartCallDialog open={openDialog} handleClose={handleCloseDialog} />
    </>
  );
};

export default Call;
