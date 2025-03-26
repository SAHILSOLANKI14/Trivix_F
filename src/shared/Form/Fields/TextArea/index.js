import React from "react";
import { TextArea } from "semantic-ui-react";
import { theme } from "../../../../Theme/theme";

const DynamicTextArea = ({
  placeholder,
  value,
  onChange,
  rows,
  style = {},
  label,
}) => {
  return (
    <>
      {label && (
        <label
          style={{
            fontSize: "16px",
            color: theme.colors.black,
            paddingBottom: "10px",
          }}
        >
          {label}
        </label>
      )}
      <TextArea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        style={{
          border: `1px solid rgba(34, 36, 38, .15)`,
          borderRadius: ".28571429rem",
          padding: ".67857143em 1em",
          width: "100%",
          ...style,
        }}
      />
    </>
  );
};

export default DynamicTextArea;
