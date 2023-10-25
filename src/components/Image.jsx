import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholder from "../assets/Images/placeholder.png";
import { PropTypes } from "prop-types";

const Image = ({ src, alt, className, onClick, style, height, width }) => {
  return (
    <LazyLoadImage
      alt={alt}
      src={src}
      height={height}
      width={width}
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
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Image;
