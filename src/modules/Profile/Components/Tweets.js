import React from "react";
import { Card, Icon, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useSelector } from "react-redux";
import { theme } from "../../../Theme/theme";
import CustomIcon from "../../../shared/Icon";

const Tweets = () => {
  const { data } = useSelector((state) => state.AllTweet);
  // const data = [
  //   {
  //     username: "@WanderlustTravels",
  //     display_name: "Wanderlust Travels",
  //     tweet:
  //       "Escape the ordinary & explore the extraordinary! 🌴✨ Book your dream vacation today! #TravelMore #Wanderlust",
  //     likes: 1200,
  //     retweets: 450,
  //     timestamp: "2025-03-04T10:30:00Z",
  //   },
  //   {
  //     username: "@TechGuru",
  //     display_name: "Tech Guru",
  //     tweet:
  //       "Restarting your router is the IT version of ‘Have you tried turning it off and on again?’ #TechLife",
  //     likes: 2300,
  //     retweets: 760,
  //     timestamp: "2025-03-04T12:00:00Z",
  //   },
  //   {
  //     username: "@InspoDaily",
  //     display_name: "Inspo Daily",
  //     tweet:
  //       "Success is not final, failure is not fatal—it’s the courage to continue that counts. Keep going! 🚀 #MondayMotivation",
  //     likes: 3400,
  //     retweets: 980,
  //     timestamp: "2025-03-04T14:15:00Z",
  //   },
  //   {
  //     username: "@ElonMusk",
  //     display_name: "Elon Musk",
  //     tweet: "Just bought Mars. Waiting for WiFi installation. #SpaceX",
  //     likes: 89000,
  //     retweets: 32000,
  //     timestamp: "2025-03-04T16:45:00Z",
  //   },
  //   {
  //     username: "@ElonMusk",
  //     display_name: "Elon Musk",
  //     tweet: "Just bought Mars. Waiting for WiFi installation. #SpaceX",
  //     likes: 89000,
  //     retweets: 32000,
  //     timestamp: "2025-03-04T16:45:00Z",
  //   },
  // ];

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
      }}
    >
      {data.map((tweet, index) => (
        <Card
          fluid
          style={{
            minHeight: "100px",
            minWidth: "300px",
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-between",
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
            style={{ display: "flex", color: theme.colors.white }}
          >
            <CustomIcon
              name="heart"
              color="red"
              style={{ color: theme.colors.white }}
            />
            <span>{tweet.likes} Likes</span>
            <CustomIcon
              name="retweet"
              style={{ marginLeft: "10px", color: theme.colors.white }}
            />
            {tweet.retweets} Retweets
            <CustomIcon name="clock outline" style={{ marginLeft: "10px" }} />
            {tweet?.createdAt}
          </Card.Content>
        </Card>
      ))}
    </div>
  );
};

export default Tweets;
