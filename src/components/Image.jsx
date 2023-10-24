import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholder from "../assets/Images/placeholder.png";
import { PropTypes } from "prop-types";

const Image = ({ src, alt, className, onClick, style }) => {
  return (
    <LazyLoadImage
      alt={alt}
      src={src}
      height={"100%"}
      width={"100%"}
      className={className}
      placeholderSrc={placeholder}
      onClick={onClick}
      style={style}
    />
  );
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default Image;
