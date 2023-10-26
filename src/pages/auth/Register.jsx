import { Link } from "@mui/material";
import FormProvider from "../../components/hook-form/FormProvider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import AuthSocial from "../../components/auth/AuthSocial";
import RegisterForm from "../../components/auth/RegisterForm";
import OrDivider from "../../components/auth/OrDivider";

const Register = () => {
  return (
    <FormProvider>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant={"h4"}>Get Start With Swift</Typography>

        <Stack direction={"row"} spacing={0.5}>
          <Typography variant={"body2"}>Already have an account?</Typography>
          <Link to={"/auth/login"} component={RouterLink} variant={"subtitle2"}>
            Sign in
          </Link>
        </Stack>
      </Stack>

      {/* Register form */}
      <RegisterForm />

      <Typography
        component="div"
        sx={{
          color: "text.secondary",
          mt: 3,
          typography: "caption",
          textAlign: "center",
        }}
      >
        {"By signing up, I agree to "}
        <Link underline="always" color="text.primary">
          Terms of Service
        </Link>
        {" and "}
        <Link underline="always" color="text.primary">
          Privacy Policy
        </Link>
        .
      </Typography>
      {/* Divider */}
      <OrDivider />
      {/* Social auth */}
      <AuthSocial />
    </FormProvider>
  );
};

export default Register;
