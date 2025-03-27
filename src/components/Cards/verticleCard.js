import React from "react";
import { Card, Image, CardMeta, Header } from "semantic-ui-react";
import { theme } from "../../Theme/theme";
import CustomIcon from "../../shared/Icon";

const CustomCard = ({ item, style = {} }) => {
  return (
    <div
      style={{
        padding: "20px 5px",
        display: "flex",
        justifyContent: "center",
        margin: "0px", // Ensure no extra margin
      }}
    >
      <Card
        style={{
          backgroundColor: theme.colors.main,
          color: theme.colors.white,
          width: "350px",
          height: "100%",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "none",
          margin: 0, // Remove extra margin
          // border: `1px solid  ${theme.colors.white}`,
        }}
      >
        <Image
          src={item.src}
          ui={true}
          style={{
            width: "100%",
            objectFit: "cover",
            maxHeight: "145px",
            padding: 0,
          }}
        />
        <Card.Content>
          <Card.Header
            style={{
              color: theme.colors.white,
              padding: "7px",
            }}
          >
            {item.title}
          </Card.Header>
          <CardMeta
            style={{
              color: theme.colors.white,
              padding: 0,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CustomIcon
              name={"map marker alternate"}
              style={{ color: theme.colors.white, padding: 0 }}
            />
            {item.meta}
          </CardMeta>
          <Card.Description>
            <div
              style={{
                color: theme.colors.white,
                padding: "0px 5px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Card.Meta style={{ display: "flex", alignItems: "center" }}>
                <Header
                  as={"h4"}
                  style={{ color: theme.colors.white, margin: 0 }}
                >
                  ₹40 /
                </Header>
                <span> Visit</span>
              </Card.Meta>
              <CustomIcon name="heart outline" color="white" size="large" />
            </div>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
};

export default CustomCard;
