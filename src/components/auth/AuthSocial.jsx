import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { GithubLogo, GoogleLogo, TwitterLogo } from "phosphor-react";

const AuthSocial = () => {
  return (
    <Stack direction={"row"} justifyContent={"center"} spacing={3}>
      <IconButton>
        <GoogleLogo color="#df3e30" />
      </IconButton>
      <IconButton color="inherit">
        <GithubLogo />
      </IconButton>
      <IconButton>
        <TwitterLogo color="#1c6cea" />
      </IconButton>
    </Stack>
  );
};

export default AuthSocial;
