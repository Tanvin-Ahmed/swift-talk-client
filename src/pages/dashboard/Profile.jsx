import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { CaretLeft } from "phosphor-react";
import ProfileForm from "../../components/profile/ProfileForm";

const Profile = () => {
  return (
    <>
      <Stack direction={"row"} width={"100%"}>
        {/* Left */}
        <Box
          sx={{
            position: "relative",
            width: 320,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#f8faff"
                : theme.palette.background.paper,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={4} spacing={5}>
            {/* Header */}
            <Stack direction={"row"} spacing={3} alignItems={"center"}>
              <IconButton>
                <CaretLeft size={24} color="#4b4b4b" />
              </IconButton>
              <Typography variant={"h5"}>Profile</Typography>
            </Stack>
            {/* Profile form */}
            <ProfileForm />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Profile;
