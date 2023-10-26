import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import StyledBadge from "../StyledBadge";
import { PropTypes } from "prop-types";
import { ArrowDownLeft, ArrowUpRight, Phone } from "phosphor-react";

const CallLogElement = ({ online, incoming, missed, name, time, img }) => {
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
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              {incoming ? (
                <ArrowDownLeft color={missed ? "red" : "green"} />
              ) : (
                <ArrowUpRight color={missed ? "red" : "blue"} />
              )}
              <Typography variant={"caption"}>{time}</Typography>
            </Stack>
          </Stack>
        </Stack>
        <IconButton>
          <Phone color={"green"} />
        </IconButton>
      </Stack>
    </Box>
  );
};

CallLogElement.propTypes = {
  online: PropTypes.bool,
  incoming: PropTypes.bool,
  missed: PropTypes.bool,
  name: PropTypes.string,
  time: PropTypes.string,
  img: PropTypes.string,
};

export default CallLogElement;
