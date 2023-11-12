import { useState } from "react";
import FormProvider from "../hook-form/FormProvider";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import RHFTextField from "../hook-form/RHFTextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Eye, EyeSlash } from "phosphor-react";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/auth";

const Schema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at lest 8 character")
    .required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(Schema),
  });

  const {
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      dispatch(loginUser(data));
    } catch (error) {
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField name={"email"} label={"Email address"} />
        <RHFTextField
          name={"password"}
          label={"Password"}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <Box>
                  {showPassword ? (
                    <IconButton onClick={() => setShowPassword(false)}>
                      <Eye />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => setShowPassword(true)}>
                      <EyeSlash />
                    </IconButton>
                  )}
                </Box>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack alignItems={"flex-end"} sx={{ my: 2 }}>
        <Link
          component={RouterLink}
          to={"/auth/reset-password"}
          variant={"body2"}
          color={"inherit"}
          underline="always"
          sx={{ cursor: "pointer" }}
        >
          Forgot Password?
        </Link>
      </Stack>
      <Button
        fullWidth
        color="inherit"
        size="lg"
        type="submit"
        variant={"contained"}
        sx={{
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "gray.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "gray.800",
          },
        }}
      >
        Login
      </Button>
    </FormProvider>
  );
};

export default LoginForm;
