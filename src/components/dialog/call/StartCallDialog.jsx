import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { forwardRef } from "react";
import Slide from "@mui/material/Slide";
import { PropTypes } from "prop-types";
import { Search, SearchIconWrapper, StyledInputBase } from "../../Search";
import { MagnifyingGlass } from "phosphor-react";
import CallElement from "../../call/CallElement";
import { MemberList } from "../../../data";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StartCallDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="xs"
      sx={{
        p: 4,
        bgcolor: (theme) =>
          theme.palette.mode === "light"
            ? "#f8faff"
            : theme.palette.background.paper,
      }}
    >
      <DialogTitle sx={{ mb: 2 }}>Start Call</DialogTitle>
      <DialogContent>
        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search..." />
          </Search>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Stack spacing={2}>
          {MemberList.map((member) => (
            <CallElement key={member.id} {...member} />
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

StartCallDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default StartCallDialog;
