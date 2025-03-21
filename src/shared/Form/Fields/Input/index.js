import React from "react";
import { Input } from "semantic-ui-react";
const InputComponent = ({
  placeholder,
  icon,
  iconPosition,
  loading,
  type,
  size,
  style,
  value,
  className,
  onChange = () => {},
}) => {
  return (
    <Input
      placeholder={placeholder}
      icon={icon}
      className={className}
      type={type}
      size={size}
      value={value}
      iconPosition={iconPosition}
      loading={loading}
      onChange={onChange}
      style={{ ...style }}
    />
  );
};

export default InputComponent;
