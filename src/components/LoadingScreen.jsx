import Stack from "@mui/material/Stack";
import { SyncLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <Stack
      width={"100%"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SyncLoader color="#36d7b7" />
    </Stack>
  );
};

export default LoadingScreen;
