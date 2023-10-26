import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { forwardRef } from "react";
import Slide from "@mui/material/Slide";
import { PropTypes } from "prop-types";
import CreateGroupForm from "../Group/CreateGroupForm";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroupDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="xs"
      sx={{ p: 4 }}
    >
      <DialogTitle sx={{ mb: 2 }}>Create New Group</DialogTitle>
      <DialogContent>
        <CreateGroupForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

CreateGroupDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default CreateGroupDialog;
