import { useTheme } from "@mui/material/styles";
import {
  Bell,
  CaretLeft,
  Key,
  Lock,
  PencilCircle,
  Image,
  Note,
  Keyboard,
  Info,
} from "phosphor-react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { faker } from "@faker-js/faker";
import ShortcutsDialog from "../../components/dialog/settings/ShortcutsDialog";
import { useState } from "react";

const Settings = () => {
  const theme = useTheme();
  const [openShortcut, setOpenShortcut] = useState(false);

  const handleOpenShortcut = () => setOpenShortcut(true);
  const handleCloseShortcut = () => setOpenShortcut(false);

  const Settings_Options = [
    {
      key: 0,
      icon: <Bell size={20} />,
      title: "Notifications",
      onclick: () => {},
    },
    {
      key: 1,
      icon: <Lock size={20} />,
      title: "Privacy",
      onclick: () => {},
    },
    {
      key: 2,
      icon: <Key size={20} />,
      title: "Security",
      onclick: () => {},
    },
    {
      key: 3,
      icon: <PencilCircle size={20} />,
      title: "Theme",
      onclick: () => {},
    },
    {
      key: 4,
      icon: <Image size={20} />,
      title: "Chat Wallpaper",
      onclick: () => {},
    },
    {
      key: 5,
      icon: <Note size={20} />,
      title: "Request Account Info",
      onclick: () => {},
    },
    {
      key: 6,
      icon: <Keyboard size={20} />,
      title: "Keyboard Shortcuts",
      onclick: handleOpenShortcut,
    },
    {
      key: 7,
      icon: <Info size={20} />,
      title: "Help",
      onclick: () => {},
    },
  ];

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Left panel */}
        <Box
          sx={{
            overflowY: "auto",
            height: "100vh",
            width: 320,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#f8faff"
                : theme.palette.background,
            boxShadow: "0px 0px 2 px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={4} spacing={5}>
            {/* Header */}
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
              <IconButton>
                <CaretLeft size={24} color={"#4b4b4b"} />
              </IconButton>
              <Typography variant="h6">Settings</Typography>
            </Stack>
            {/* Profile */}
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
              <Avatar
                sx={{ width: 56, height: 56 }}
                src={faker.image.avatar()}
                alt={faker.name.fullName()}
              />
              <Stack spacing={0.5}>
                <Typography variant={"article"}>
                  {faker.name.fullName()}
                </Typography>
                <Typography variant={"body2"}>
                  {faker.random.words()}
                </Typography>
              </Stack>
            </Stack>
            {/* List of options */}
            <Stack spacing={4}>
              {Settings_Options.map((el) => (
                <Stack
                  key={el.key}
                  spacing={2}
                  sx={{ cursor: "pointer" }}
                  onClick={el.onclick}
                >
                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    {el.icon}
                    <Typography variant={"body2"}>{el.title}</Typography>
                  </Stack>
                  {el.key !== 7 && <Divider />}
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Box>
        {/* Right panel */}
      </Stack>
      <ShortcutsDialog open={openShortcut} handleClose={handleCloseShortcut} />
    </>
  );
};

export default Settings;
