import { Box, Stack } from "@mui/material";
import { Chat_History } from "../../data";
import {
  DocMessage,
  LinkMessage,
  MediaMessage,
  ReplyMessage,
  TextMessage,
  Timeline,
} from "./MessageTypes";

const Messages = () => {
  return (
    <Box p={3}>
      <Stack spacing={3} direction={"column"}>
        {Chat_History.map((el, index) => {
          switch (el.type) {
            case "divider":
              return <Timeline key={index} msg={el} />;

            case "msg":
              switch (el.subtype) {
                case "img":
                  return <MediaMessage key={index} msg={el} />;
                case "doc":
                  return <DocMessage key={index} msg={el} />;
                case "link":
                  return <LinkMessage key={index} msg={el} />;
                case "reply":
                  return <ReplyMessage key={index} msg={el} />;

                default:
                  return <TextMessage key={index} msg={el} />;
              }
              break;

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Messages;
