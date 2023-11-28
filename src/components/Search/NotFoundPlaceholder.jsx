import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Zoom from "@mui/material/Zoom";
import Typography from "@mui/material/Typography";
import { SmileySad } from "phosphor-react";
import PropTypes from "prop-types";

const NotFoundPlaceholder = ({ show }) => {
  return (
    <Fade in={show} timeout={1000}>
      <Box
        textAlign="center"
        p={3}
        mt={3}
        mx="auto"
        borderRadius="8px"
        boxShadow={3}
      >
        <Zoom in={show} timeout={1000}>
          <SmileySad color="#e30053" size={30} />
        </Zoom>
        <Typography variant="h6" color="#e30053" mt={2}>
          User Not Found
        </Typography>
      </Box>
    </Fade>
  );
};

NotFoundPlaceholder.propTypes = {
  show: PropTypes.bool,
};

export default NotFoundPlaceholder;
