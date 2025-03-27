import React from "react";
import { Input } from "semantic-ui-react";
import { theme } from "../../../../Theme/theme";
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
  label,
  onChange = () => {},
}) => {
  return (
    <>
      {label && (
        <label
          style={{
            fontSize: "16px",
            color: theme.colors.white,
            paddingBottom: "10px",
          }}
        >
          {label}
        </label>
      )}
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
    </>
  );
};

export default InputComponent;
