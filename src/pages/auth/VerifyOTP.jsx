import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import VerifyOTPForm from "../../components/auth/VerifyOTPForm";

const VerifyOTP = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant={"h4"}>Please Verify OTP</Typography>

        <Stack direction={"row"} spacing={0.5}>
          <Typography variant={"body2"}>Send to (tanvin@gmail.com)</Typography>
        </Stack>
      </Stack>
      <VerifyOTPForm />
    </>
  );
};

export default VerifyOTP;
