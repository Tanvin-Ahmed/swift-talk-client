import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Messages from "./Messages";

const Conversation = () => {
  return (
    <Stack
      direction={"column"}
      height={"100%"}
      maxHeight={"100vh"}
      width={"auto"}
    >
      {/* Chat header */}
      <Header />
      {/* Message */}
      <Box
        sx={{
          width: "100%",
          flexGrow: 1,
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <Messages />
      </Box>
      {/* Chat Footer */}
      <Footer />
    </Stack>
  );
};

export default Conversation;
