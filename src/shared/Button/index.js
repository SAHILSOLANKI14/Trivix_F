import React from "react";
import PropTypes from "prop-types";
import { Button, ButtonContent } from "semantic-ui-react";

const CustomButton = ({
  color,
  labelPosition,
  style,
  children,
  onClick,
  className,
  animated,
  visibleText,
  hiddenText,
  type,
  Loading,
  Disabled,
  ...props
}) => {
  return (
    <Button
      color={color}
      labelPosition={labelPosition}
      style={{ ...style }}
      className={className}
      onClick={onClick}
      animated={animated}
      type={type}
      Loading={Loading}
      Disabled={Loading}
      {...props}
    >
      {children}
    </Button>
  );
};
// Default Props
CustomButton.defaultProps = {
  background: "transparent",
  style: {},
  className: "",
  onClick: () => {},
};

// Prop Types Validation
CustomButton.propTypes = {
  color: PropTypes.string,
  labelPosition: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default CustomButton;
