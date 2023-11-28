import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Chats from "./Chats";
import Conversation from "../../components/conversation";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessage from "../../components/SharedMessage";
import StarredMessage from "../../components/StarredMessage";
import { Link } from "react-router-dom";
import NoChat from "../../components/Illustration/NoChat";

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar, roomId, chatType } = useSelector((store) => store.app);

  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <Chats />
      <Box
        sx={{
          height: "100%",
          width: sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#f0f4fa"
              : theme.palette.background.default,
        }}
      >
        {roomId && chatType === "individual" ? (
          <Conversation />
        ) : (
          <Stack
            spacing={2}
            sx={{ height: "100%", width: "100%" }}
            alignItems="center"
            justifyContent={"center"}
          >
            <NoChat />
            <Typography variant="subtitle2">
              Select a conversation or start a{" "}
              <Link
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                }}
                to="/"
              >
                new one
              </Link>
            </Typography>
          </Stack>
        )}
      </Box>
      {/* Contact */}
      {sidebar.open &&
        (() => {
          switch (sidebar.type) {
            case "CONTACT":
              return <Contact />;
            case "STARRED":
              return <StarredMessage />;
            case "SHARED":
              return <SharedMessage />;
            default:
              return <Contact />;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
