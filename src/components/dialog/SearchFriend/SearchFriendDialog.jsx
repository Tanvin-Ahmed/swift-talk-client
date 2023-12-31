import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import UserList from "./UserList";
import FriendList from "./FriendList";
import FriendRequestList from "./FriendRequestList";
import { useDispatch } from "react-redux";
import { clearAllSearchDataFromStorage } from "../../../redux/slices/app";
import FriendRequestISentList from "./FriendRequestISentList";

const SearchFriendDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // when search dialog is unmounted then all data of the search is removed
  useEffect(() => {
    return () => {
      dispatch(clearAllSearchDataFromStorage());
    };
  }, [dispatch]);

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      keepMounted
      onClose={handleClose}
      sx={{ p: 4 }}
    >
      <Stack p={2} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Requests" />
          <Tab label="Requests I sent" />
        </Tabs>
      </Stack>

      {/* Dialog Content */}
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.5}>
            {(() => {
              switch (value) {
                case 0: // display all users
                  return <UserList />;
                case 1: // display all friends
                  return <FriendList />;
                case 2: // display all friend requests
                  return <FriendRequestList />;
                case 3: // display all friend requests
                  return <FriendRequestISentList />;
                default: // display all users
                  return <UserList />;
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

SearchFriendDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default SearchFriendDialog;
