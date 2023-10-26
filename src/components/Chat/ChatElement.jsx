import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { PropTypes } from "prop-types";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ChatElement = ({ name, img, msg, time, unread, online }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        height: 60,
        borderRadius: 1,
        backgroundColor:
          theme.palette.mode === "light"
            ? "#fff"
            : theme.palette.background.default,
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        height={"100%"}
        width={"100%"}
      >
        <Stack direction={"row"} spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt="avatar" src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt="avatar" src={img} />
          )}

          <Stack direction={"column"} spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption">{msg}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"column"} spacing={2} alignItems={"center"}>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {time}
          </Typography>
          <Badge
            color="primary"
            badgeContent={unread}
            sx={{ width: "10px", height: "10px" }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

ChatElement.propTypes = {
  name: PropTypes.string,
  msg: PropTypes.string,
  time: PropTypes.string,
  img: PropTypes.string,
  unread: PropTypes.number,
  online: PropTypes.bool,
};

export default ChatElement;
