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
import Button from "@mui/material/Button";

const Schema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Password must be at lest 8 character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .min(8, "Password must be at lest 8 character")
    .required("Password is required")
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Confirm Password must be matched with new password"
    ),
});

const NewPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(Schema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      reset();
    } catch (error) {
      console.log(error);
      reset();
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

        <RHFTextField
          name={"newPassword"}
          label={"New Password"}
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
        <RHFTextField
          name={"confirmPassword"}
          label={"Confirm Password"}
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
          Submit
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default NewPasswordForm;
