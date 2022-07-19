import React from "react";
import { PropTypes } from "prop-types";
const CustomButton = (props) => {
  const {
    type = "button",
    color,
    icon,
    iconColor = "white",
    className,
    onClick,
    isLoading = false,
    ...other
  } = props;
  const buttonClass = `btn btn-${color} ${className}`;
  const spinnerClass = `spinner-border spinner-border-sm text-${iconColor} me-1`;
  const iconClass = `${icon} text-${iconColor} me-1`;

  return (
    <button onClick={onClick} type={type} className={buttonClass} {...other}>
      {isLoading ? (
        <span className={spinnerClass}></span>
      ) : (
        <span className={iconClass}></span>
      )}
      {props.children}
    </button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.oneOf(["submit", "button", "reset"]),
  color: PropTypes.string,
  icon: PropTypes.symbol,
  iconColor: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default CustomButton;
