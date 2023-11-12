import FormProvider from "../hook-form/FormProvider";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import RHFTextField from "../hook-form/RHFTextField";
import Button from "@mui/material/Button";
import { forgotPassword } from "../../redux/slices/auth";
import { useDispatch } from "react-redux";

const Schema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(Schema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      dispatch(forgotPassword(data));
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
          Send Request
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default ResetPasswordForm;
