import { useState } from "react";
import FormProvider from "../hook-form/FormProvider";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import RHFTextField from "../hook-form/RHFTextField";
import { Eye, EyeSlash } from "phosphor-react";
import { registerUser } from "../../redux/slices/auth";
import { useDispatch } from "react-redux";

const Schema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at lest 8 character")
    .required("Password is required"),
});

const RegisterForm = () => {
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
      dispatch(registerUser(data));
    } catch (error) {
      console.log(error);
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

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField name={"firstName"} label={"First Name"} />
          <RHFTextField name={"lastName"} label={"Last Name"} />
        </Stack>
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
          Create Account
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default RegisterForm;
