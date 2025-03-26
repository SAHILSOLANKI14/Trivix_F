import React from "react";
import { Input, Header } from "semantic-ui-react";
import CustomIcon from "../../../shared/Icon";
import { theme } from "../../../Theme/theme";

const SettingsHeader = ({ title, isMobile }) => {
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "15px",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        gap: "50px",
        borderBottom: ` 1px solid ${theme.colors.gray}`,
      }}
    >
      <a href="/">
        <div style={{ display: "flex", alignItems: "center" }}>
          <CustomIcon
            name="arrow left"
            size="large"
            style={{ color: theme.colors.white, cursor: "pointer" }}
          />
          <Header style={{ margin: "5px", color: theme.colors.white }}>
            Back
          </Header>
        </div>
      </a>
      <Input
        icon="search"
        placeholder="Search..."
        style={{
          marginBottom: isMobile ? "0px" : "12px",
          marginRight: "10px",
          marginTop: "0px",
        }}
      />
    </div>
  );
};

export default SettingsHeader;
