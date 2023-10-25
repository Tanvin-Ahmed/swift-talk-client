import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { PropTypes } from "prop-types";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const list = [
  {
    key: 0,
    title: "Mark as unread",
    combination: ["Cmd", "Shift", "U"],
  },
  {
    key: 1,
    title: "Mute",
    combination: ["Cmd", "Shift", "M"],
  },
  {
    key: 2,
    title: "Archive Chat",
    combination: ["Cmd", "Shift", "E"],
  },
  {
    key: 3,
    title: "Delete Chat",
    combination: ["Cmd", "Shift", "D"],
  },
  {
    key: 4,
    title: "Pin Chat",
    combination: ["Cmd", "Shift", "P"],
  },
  {
    key: 5,
    title: "Search",
    combination: ["Cmd", "F"],
  },
  {
    key: 6,
    title: "Search Chat",
    combination: ["Cmd", "Shift", "F"],
  },
  {
    key: 7,
    title: "Next Chat",
    combination: ["Cmd", "N"],
  },
  {
    key: 8,
    title: "Next Step",
    combination: ["Ctrl", "Tab"],
  },
  {
    key: 9,
    title: "Previous Step",
    combination: ["Ctrl", "Shift", "Tab"],
  },
  {
    key: 10,
    title: "New Group",
    combination: ["Cmd", "Shift", "N"],
  },
  {
    key: 11,
    title: "Profile & About",
    combination: ["Cmd", "P"],
  },
  {
    key: 12,
    title: "Increase speed of voice message",
    combination: ["Shift", "."],
  },
  {
    key: 13,
    title: "Decrease speed of voice message",
    combination: ["Shift", ","],
  },
  {
    key: 14,
    title: "Settings",
    combination: ["Shift", "S"],
  },
  {
    key: 15,
    title: "Emoji Panel",
    combination: ["Cmd", "E"],
  },
  {
    key: 16,
    title: "Sticker Panel",
    combination: ["Cmd", "S"],
  },
];

const ShortcutsDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
      keepMounted
      TransitionComponent={Transition}
      sx={{ p: 4 }}
    >
      <DialogTitle>Keyboard shortcuts</DialogTitle>
      <DialogContent sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {list.map((el) => (
            <Grid key={el.key} item xs={6}>
              <Stack
                sx={{ width: "100%" }}
                spacing={3}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography variant={"caption"} sx={{ fontSize: 14 }}>
                  {el.title}
                </Typography>
                <Stack spacing={2} direction={"row"}>
                  {el.combination.map((key) => (
                    <Button
                      key={key}
                      disabled
                      variant={"outlined"}
                      sx={{ color: "#212121" }}
                    >
                      {key}
                    </Button>
                  ))}
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} onClick={handleClose}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ShortcutsDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default ShortcutsDialog;
