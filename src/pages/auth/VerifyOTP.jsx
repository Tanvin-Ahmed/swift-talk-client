import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import VerifyOTPForm from "../../components/auth/VerifyOTPForm";
import { useSelector } from "react-redux";

const VerifyOTP = () => {
  const { email } = useSelector((state) => state.auth);
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant={"h4"}>Please Verify OTP</Typography>

        <Stack direction={"row"} spacing={0.5}>
          <Typography variant={"body2"}>Send to ({email})</Typography>
        </Stack>
      </Stack>
      <VerifyOTPForm />
    </>
  );
};

export default VerifyOTP;
