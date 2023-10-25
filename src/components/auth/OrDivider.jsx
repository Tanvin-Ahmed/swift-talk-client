import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

const OrDivider = () => {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Divider sx={{ flexGrow: 1, mx: "8px" }} />
      <Typography variant="body2" color={"text.disabled"}>
        OR
      </Typography>
      <Divider sx={{ flexGrow: 1, mx: "8px" }} />
    </Stack>
  );
};

export default OrDivider;
