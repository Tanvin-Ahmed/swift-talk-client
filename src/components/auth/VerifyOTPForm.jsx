import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormProvider from "../hook-form/FormProvider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import RHFCodes from "../hook-form/RHFCodes";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../redux/slices/auth";

const Schema = Yup.object().shape({
  code1: Yup.string().required("Code1 is required"),
  code2: Yup.string().required("Code2 is required"),
  code3: Yup.string().required("Code3 is required"),
  code4: Yup.string().required("Code4 is required"),
  code5: Yup.string().required("Code5 is required"),
  code6: Yup.string().required("Code6 is required"),
});

const defaultValues = {
  code1: "",
  code2: "",
  code3: "",
  code4: "",
  code5: "",
  code6: "",
};

const VerifyOTPForm = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      const otp = `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`;
      dispatch(verifyEmail({ otp, email }));
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {/* Custom OTP input */}
      <Stack spacing={3}>
        <RHFCodes
          keyName="code"
          inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
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
          Login
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default VerifyOTPForm;
