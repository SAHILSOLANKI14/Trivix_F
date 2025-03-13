import React from "react";
import {
  Card,
  Image,
  CardContent,
  CardMeta,
  CardDescription,
} from "semantic-ui-react";
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
          // backgroundColor: theme.colors.gray,
          color: theme.colors.white,
          width: "350px",
          height: "220px",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "none",
        }}
      >
        <Image
          src={item.src}
          ui={true}
          style={{
            width: "100%",
            objectFit: "cover",
            height: "100%",
            padding: 0,
          }}
        />
        <CardContent style={{ ...style }}>
          <CardMeta style={{ color: theme.colors.white, padding: "5px" }}>
            {item.name}
          </CardMeta>
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
          <CardDescription style={{ color: theme.colors.white }}>
            {item.description}
          </CardDescription>
        </CardContent>
        {item.extraContent && (
          <CardContent extra>{item.extraContent}</CardContent>
        )}
      </Card>
    </div>
  );
};

export default CustomCard;
