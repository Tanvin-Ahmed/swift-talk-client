import {
  Box,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Image, DownloadSimple, DotsThreeVertical } from "phosphor-react";
import { Message_options } from "../../data";
import { useState } from "react";

const Timeline = ({ msg }) => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Divider sx={{ width: "46%" }} />
      <Typography variant={"caption"} sx={{ color: theme.palette.text }}>
        {msg?.text}
      </Typography>
      <Divider sx={{ width: "46%" }} />
    </Stack>
  );
};

const TextMessage = ({ msg }) => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      justifyContent={msg.incoming ? "start" : "end"}
      alignItems={"center"}
    >
      <Box
        p={1.5}
        sx={{
          backgroundColor: msg.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5, // 1.5 * 8 = 12px
          width: "max-content",
        }}
      >
        <Typography
          variant={"body2"}
          color={msg.incoming ? theme.palette.text : "#fff"}
        >
          {msg.message}
        </Typography>
      </Box>
      {/* options */}
      <MessageOptions />
    </Stack>
  );
};

const MediaMessage = ({ msg }) => {
  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      justifyContent={msg.incoming ? "start" : "end"}
      alignItems={"center"}
    >
      <Box
        p={1.5}
        sx={{
          backgroundColor: msg.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5, // 1.5 * 8 = 12px
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <img
            src={msg.img}
            alt={msg.message}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          />
          <Typography
            variant={"body2"}
            color={msg.incoming ? theme.palette.text : "#fff"}
          >
            {msg.message}
          </Typography>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
};

const ReplyMessage = ({ msg }) => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      justifyContent={msg.incoming ? "start" : "end"}
      alignItems={"center"}
    >
      <Box
        p={1.5}
        sx={{
          backgroundColor: msg.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5, // 1.5 * 8 = 12px
          width: "max-content",
        }}
      >
        <Stack spacing={2} direction={"column"}>
          <Stack
            spacing={3}
            direction={"column"}
            alignItems={"center"}
            p={2}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color={theme.palette.text}>
              {msg?.message}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color={msg.incoming ? theme.palette.text : "#fff"}
          >
            {msg.reply}
          </Typography>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
};

const LinkMessage = ({ msg }) => {
  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      justifyContent={msg.incoming ? "start" : "end"}
      alignItems={"center"}
    >
      <Box
        p={1.5}
        sx={{
          backgroundColor: msg.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5, // 1.5 * 8 = 12px
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={3}
            spacing={3}
            alignItems={"start"}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <img
              src={msg?.preview}
              alt={msg?.message}
              style={{ maxHeight: 210, borderRadius: "10px" }}
            />
            <Stack spacing={2}>
              <Typography variant="subtitle2">Creating chat app</Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: theme.palette.primary.main }}
                component={Link}
                to="//https://www.youtube.com"
              >
                www.youtube.com
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              color={msg.incoming ? theme.palette.text : "#fff"}
            >
              {msg.message}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
};

const DocMessage = ({ msg }) => {
  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      justifyContent={msg.incoming ? "start" : "end"}
      alignItems={"center"}
    >
      <Box
        p={1.5}
        sx={{
          backgroundColor: msg.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5, // 1.5 * 8 = 12px
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction={"row"}
            spacing={3}
            alignItems={"center"}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Image size={48} />
            <Typography variant="caption">Abstract.pdf</Typography>
            <IconButton>
              <DownloadSimple />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            color={msg.incoming ? theme.palette.text : "#fff"}
          >
            {msg?.message}
          </Typography>
        </Stack>
      </Box>
      <MessageOptions />
    </Stack>
  );
};

const MessageOptions = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="small"
      >
        <DotsThreeVertical size={20} />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((el) => (
            <MenuItem key={el.title} onClick={handleClose}>
              {el.title}
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
};

export {
  Timeline,
  TextMessage,
  MediaMessage,
  ReplyMessage,
  LinkMessage,
  DocMessage,
};
