import React from "react";
import { useSelector } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import { Card } from "semantic-ui-react";
import { theme } from "../../../Theme/theme";
import CustomIcon from "../../../shared/Icon";

const Tweets = ({ tweets }) => {
  const { data } = useSelector((state) => state.AllTweet);
  const Data = tweets ? tweets : data;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        maxWidth: "100%",
        overflow: "hidden",
        gap: "10px",
        padding: "10px",
        marginBottom: "30px",
      }}
    >
      {Data?.map((tweet, index) => (
        <Card
          fluid
          style={{
            minHeight: "100px",
            minWidth: "300px",
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-between"
            padding: "0px",
            margin: "0px",
            background: "transparent",
          }}
        >
          <Card.Content style={{ flexGrow: 1 }}>
            <Card.Header style={{ color: theme.colors.white }}>
              {tweet?.owner?.details?.agencyName}
            </Card.Header>
            <Card.Meta style={{ color: theme.colors.white }}>
              {tweet?.owner?.details?.userName}
            </Card.Meta>
            <Card.Description style={{ color: theme.colors.white }}>
              {tweet.content}
            </Card.Description>
          </Card.Content>
          <Card.Content
            extra
            style={{
              display: "flex",
              color: theme.colors.white,
              alignItems: "center",
            }}
          >
            <CustomIcon
              name="heart"
              color="red"
              style={{ color: theme.colors.white }}
            />
            <span>{tweet.likes} Likes</span>

            <CustomIcon
              name="clock outline"
              style={{ marginLeft: "10px", color: theme.colors.white }}
            />
            {tweet?.createdAt}
          </Card.Content>
        </Card>
      ))}
    </div>
  );
};

export default Tweets;
