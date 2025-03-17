import React from "react";
import { Card, Image } from "semantic-ui-react";
import userProfile from "../../assets/images/Ellipse 194.svg";
import backgroundImg from "../../assets/images/Placeholder.png";
import { Button } from "../../shared";
import CustomIcon from "../../shared/Icon";
import { useSelector } from "react-redux";
import { theme } from "../../Theme/theme";
const ProfileCard = () => {
  const { Data } = useSelector((state) => state.auth);
  // console.log(Data.agency);
  const data = Data?.agency || Data?.traveler;

  return (
    <div style={{ padding: 7, borderRadius: "15px" }}>
      <Card
        centered
        style={{
          borderRadius: "15px",
          overflow: "hidden",
          top: "70px",
          background: theme.colors.main,
          padding: "0px",
          margin: "0px",
          border: `1px solid  ${theme.colors.white}`,
        }}
      >
        <Image
          src={backgroundImg}
          style={{
            objectFit: "cover",
            height: "90px",
          }}
        />
        <Image
          src={userProfile}
          circular
          centered
          style={{
            marginTop: "-40px",
            width: "70px",
          }}
        />
        <Card.Content
          textAlign="center"
          padding={"20px"}
          style={{ border: "none" }}
        >
          <Card.Meta style={{ color: theme.colors.white }}>
            100 Following &nbsp; 100 Followers
          </Card.Meta>
          <Card.Meta style={{ display: "flex", marginLeft: "50px" }}>
            <CustomIcon
              name="map marker alternate"
              title={data?.city || "Ahemdabad"}
              style={{
                display: "flex",
                gap: "10px",
                color: theme.colors.white,
              }}
            />
          </Card.Meta>
          <div style={{ marginTop: "10px" }}>
            <a href={`/profile/${Data?.traveler?._id || Data?.agency?._id}`}>
              <Button color="orange" fluid style={{ borderRadius: "20px" }}>
                Profile
              </Button>
            </a>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ProfileCard;
