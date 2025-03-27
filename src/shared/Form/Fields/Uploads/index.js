import React, { useState } from "react";
import { Input } from "../../..";
import { theme } from "../../../../Theme/theme";
import CustomIcon from "../../../Icon";

const FileUpload = ({
  label = "Upload File",
  onFileChange,
  multiple = false,
  accept = "*",
  onChange,
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);

    if (onFileChange) {
      onFileChange(files);
    }
    if (onChange) {
      onChange(event);
    }
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    if (onFileChange) {
      onFileChange(updatedFiles);
    }
  };

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
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleFileChange}
      />
      {selectedFiles.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <strong>Selected Files:</strong>
          <ul>
            {selectedFiles.map((file, index) => (
              <>
                <li
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {file.name}
                  <CustomIcon
                    name="close"
                    onClick={() => handleRemoveFile(index)}
                    style={{ cursor: "pointer" }}
                  />
                </li>
              </>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default FileUpload;
