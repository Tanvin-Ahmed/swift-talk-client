import {
  Box,
  IconButton,
  Stack,
  InputAdornment,
  TextField,
  Fab,
  Tooltip,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import {
  Camera,
  File,
  Image,
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
  Sticker,
  User,
} from "phosphor-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";
import { PropTypes } from "prop-types";

const StyledInput = styled(TextField)(() => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

const Actions = [
  {
    color: "#4da5fe",
    icon: <Image size={24} />,
    y: 102,
    title: "Photo/Video",
  },
  {
    color: "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 172,
    title: "Stickers",
  },
  {
    color: "#0172e4",
    icon: <Camera size={24} />,
    y: 242,
    title: "Image",
  },
  {
    color: "#0159b2",
    icon: <File size={24} />,
    y: 312,
    title: "Document",
  },
  {
    color: "#013f7f",
    icon: <User size={24} />,
    y: 382,
    title: "Contact",
  },
];

const ChatInput = ({ setOpenPicker }) => {
  const [openActions, setOpenActions] = useState();
  return (
    <StyledInput
      multiline
      rows={1}
      maxRows={5}
      fullWidth
      placeholder="Write a message..."
      variant="filled"
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Stack sx={{ width: "max-content" }}>
            <Stack
              sx={{
                position: "relative",
                display: openActions ? "inline-block" : "none",
              }}
            >
              {Actions.map((el) => (
                <Tooltip title={el.title} key={el.title} placement="right">
                  <Fab
                    sx={{
                      position: "absolute",
                      top: -el.y,
                      backgroundColor: el.color,
                    }}
                  >
                    {el.icon}
                  </Fab>
                </Tooltip>
              ))}
            </Stack>
            <InputAdornment>
              <IconButton onClick={() => setOpenActions((p) => !p)}>
                <LinkSimple />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          <InputAdornment>
            <IconButton onClick={() => setOpenPicker((prev) => !prev)}>
              <Smiley />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

ChatInput.propTypes = {
  setOpenPicker: PropTypes.bool,
};

const Footer = () => {
  const theme = useTheme();
  const [openPicker, setOpenPicker] = useState(false);

  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#f8faff"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0,25)",
      }}
    >
      <Stack
        direction={"row"}
        spacing={3}
        alignItems={"center"}
        sx={{ position: "relative" }}
      >
        <Stack sx={{ width: "100%" }}>
          {openPicker ? (
            <Box
              sx={{ zIndex: 10, position: "absolute", bottom: 70, right: 30 }}
            >
              <Picker
                theme={theme.palette.mode}
                data={data}
                onEmojiSelect={console.log}
              />
            </Box>
          ) : null}
          <ChatInput setOpenPicker={setOpenPicker} />
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            height: 48,
            width: 48,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 1.5,
          }}
        >
          <IconButton sx={{ height: "100%", width: "100%" }}>
            <PaperPlaneTilt color="#fff" />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
