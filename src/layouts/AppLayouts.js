import React from "react";
import CustomeSidebar from "../shared/Sidebar";
import { Grid, GridColumn } from "semantic-ui-react";
import { useMediaQuery } from "@react-hook/media-query";
import Nav from "../modules/Packages/Components/Nav";
import { Button } from "../shared";
import CustomIcon from "../shared/Icon";

const AppLayouts = ({ children }) => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 991px)");
  const isComputer = useMediaQuery(
    "(min-width: 991px) and (max-width: 1024px)"
  );

  const getPadding = () => {
    if (isMobile) return "0px";
    if (isTablet) return "0px";
    return "10px";
  };

  return (
    <>
      <Grid
        stackable
        style={{ padding: "0 !important", margin: "0", width: "100%" }}
      >
        <Grid.Row
          style={{
            display: "flex",
            justifyContent: "center",
            background: "radial - gradient(black, transparent)",
          }}
        >
          {/* Sidebar: Hidden on mobile screens */}
          <GridColumn
            width={4}
            tablet={2}
            computer={isComputer ? 0 : 2}
            largeScreen={3}
          >
            <CustomeSidebar />
          </GridColumn>

          {/* Main Content: Uses full width on mobile */}
          <GridColumn
            width={16}
            mobile={16}
            tablet={16}
            computer={isMobile ? 16 : 14}
            largeScreen={13}
          >
            {children}
          </GridColumn>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default AppLayouts;
