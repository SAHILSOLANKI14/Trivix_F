import React, { useState } from "react";
import { Card, Image, List, ListItem } from "semantic-ui-react";
import { theme } from "../../Theme/theme";
import Cardimg from "../../assets/images/card3.png";
import CustomIcon from "../../shared/Icon";

const TravelCard = ({ item, style = {}, handleNavigateDetailpage }) => {
  const [wishlist, setWishlist] = useState(false);

  // Calculate duration from startDate to endDate
  const getDuration = (start, end) => {
    if (!start || !end) return "";
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return `${diffTime} days`;
  };

  const handleWishList = () => {
    setWishlist((prev) => !prev);
    console.log(wishlist);
  };

  return (
    <div
      style={{
        padding: "0px 5px",
        display: "flex",
        justifyContent: "center",
        margin: "0px",
      }}
    >
      <Card
        style={{
          backgroundColor: theme.colors.white,
          color: theme.colors.white,
          width: "250px",
          minHeight: "310px",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "none",
          margin: 0,
          padding: 0,
          position: "relative",
          border: `1px solid  ${theme.colors.white}`,
        }}
      >
        <Image
          src={Cardimg}
          ui={true}
          style={{
            width: "100%",
            objectFit: "cover",
            maxHeight: "120px",
            padding: 0,
            margin: 0,
          }}
        />
        <div
          style={{ position: "absolute", top: 10, right: 10 }}
          onclick={() => handleWishList()}
        >
          <CustomIcon
            name={`heart ${wishlist ? "" : "outline"}`}
            size="large"
            style={{ color: theme.colors.white }}
          />
        </div>
        <Card.Content style={{ gap: "10px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleNavigateDetailpage(item._id)}
            >
              <Card.Header
                style={{
                  color: theme.colors.orange,
                  padding: "0px",
                  fontWeight: "500",
                }}
              >
                {item.title || "No Title"}
              </Card.Header>
              <Card.Header
                style={{
                  color: theme.colors.gray,
                  padding: "0px",
                  fontWeight: "300",
                  fontSize: "9px",
                }}
              >
                {getDuration(item.startDate, item.endDate)}
              </Card.Header>
            </div>
          </div>
          <Card.Description
            style={{
              display: "flex",
              gap: "10px",
              border: "none",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            {["plane", "hotel", "car", "camera"].map((icon) => (
              <CustomIcon
                key={icon}
                name={icon}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "5px",
                }}
              />
            ))}
          </Card.Description>
          <Card.Content extra style={{ marginTop: "10px", minHeight: "60px" }}>
            <List bulleted>
              {item.activities && typeof item.activities[0] === "string"
                ? item.activities[0].split(",").map((activity, index) => (
                    <ListItem
                      key={index}
                      style={{ fontSize: "12px", color: theme.colors.gray }}
                    >
                      {activity.trim()}
                    </ListItem>
                  ))
                : item.activities?.map((activity, index) => (
                    <ListItem
                      key={index}
                      style={{ fontSize: "9px", color: theme.colors.gray }}
                    >
                      {activity}
                    </ListItem>
                  ))}
            </List>
          </Card.Content>
        </Card.Content>
      </Card>
    </div>
  );
};

export default TravelCard;
