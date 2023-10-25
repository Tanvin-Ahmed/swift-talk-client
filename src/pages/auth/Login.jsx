import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import AuthSocial from "../../components/auth/AuthSocial";
import OrDivider from "../../components/auth/OrDivider";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant={"h4"}>Login to Swift</Typography>
        <Stack direction={"row"} spacing={0.5}>
          <Typography variant={"body2"}>New User?</Typography>
          <Link
            to={"/auth/register"}
            component={RouterLink}
            variant={"subtitle2"}
          >
            Create an account
          </Link>
        </Stack>
        {/* Login form */}
        <LoginForm />
        {/* Divider */}
        <OrDivider />
        {/* Auth social */}
        <AuthSocial />
      </Stack>
    </>
  );
};

export default Login;
