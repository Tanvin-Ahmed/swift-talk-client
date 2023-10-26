import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import StyledBadge from "../StyledBadge";
import { PropTypes } from "prop-types";
import { Phone, VideoCamera } from "phosphor-react";

const CallElement = ({ online, name, img }) => {
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
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={img} alt={name} />
            </StyledBadge>
          ) : (
            <Avatar src={img} alt={name} />
          )}
          <Stack spacing={0.3}>
            <Typography variant={"subtitle2"}>{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <IconButton>
            <Phone color={"green"} />
          </IconButton>
          <IconButton>
            <VideoCamera color={"green"} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

CallElement.propTypes = {
  online: PropTypes.bool,
  name: PropTypes.string,
  img: PropTypes.string,
};

export default CallElement;
