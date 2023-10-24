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
import { PropTypes } from "prop-types";

const Messages = ({ menu }) => {
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
                  return <MediaMessage key={index} msg={el} menu={menu} />;
                case "doc":
                  return <DocMessage key={index} msg={el} menu={menu} />;
                case "link":
                  return <LinkMessage key={index} msg={el} menu={menu} />;
                case "reply":
                  return <ReplyMessage key={index} msg={el} menu={menu} />;

                default:
                  return <TextMessage key={index} msg={el} menu={menu} />;
              }

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

Messages.propTypes = {
  menu: PropTypes.bool,
};

export default Messages;
