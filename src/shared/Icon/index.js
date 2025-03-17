import React from "react";
import { Icon } from "semantic-ui-react";
import { Button } from "../index";

const CustomIcon = ({
  name,
  title,
  style,
  onClick,
  className,
  ...otherProps
}) => {
  return (
    <Button
      icon
      style={{
        background: "transparent",
        padding: "5px",
        display: "flex",
        alignItems: "center",
        margin: 0,
      }}
      onClick={onClick}
    >
      <Icon
        name={name || " "}
        style={{ ...style }}
        className={className}
        {...otherProps}
      >
        {title}
      </Icon>
    </Button>
  );
};

CustomIcon.defaultProps = {
  name: "star", // Default to an outlined star if no icon is provided
  title: "",
  style: {},
};

export default CustomIcon;
