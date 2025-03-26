import React from "react";
import { Tab } from "semantic-ui-react";
import { theme } from "../../Theme/theme";

const TabExampleSecondaryPointing = ({ panes, vertical = false, menu }) => (
  <Tab
    menu={{
      secondary: true,
      pointing: true,
      textAlign: "center",
      className: "custom-tabs",
      style: {
        color: theme.colors.white,
      },
      ...menu,
    }}
    panes={panes}
    vertical={vertical}
  />
);

export default TabExampleSecondaryPointing;
