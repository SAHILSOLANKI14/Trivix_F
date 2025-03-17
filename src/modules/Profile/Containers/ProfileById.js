import React, { useEffect } from "react";
import { Grid, Header, Image, TabPane } from "semantic-ui-react";
import profilePic from "../../../assets/images/Ellipse 194.svg";
import { Button } from "../../../shared";
import { theme } from "../../../Theme/theme";
import TabExampleSecondaryPointing from "../Components/Tabs";
import { useDispatch, useSelector } from "react-redux";
import ImageGroupSize from "../../../components/ImageGroup";
import Tweets from "../Components/Tweets";
import {
  agencyByIdRequest,
  getTweetsRequest,
  travelerByIdRequest,
} from "../Actions";
import { GetCurrentLogedInAgency, getFollowers, getFollowings } from "../Api";
import Cookies from "js-cookie";
import Loader from "../../../utility/Loader";
import { useParams } from "react-router-dom";

const ProfileById = () => {
  const { data, loading } = useSelector((state) => state.profile);
  const { id } = useParams();

  const panes = [
    {
      menuItem: "Post",
      render: () => (
        <TabPane
          attached={false}
          style={{
            background: "transparent",
            border: "none",
            boxShadow: "none",
            color: theme.colors.black,
            marginBottom: "30px",
          }}
        >
          <ImageGroupSize PostImage={data?.posts} />
        </TabPane>
      ),
    },
    {
      menuItem: "Tweet",
      render: () => (
        <TabPane
          attached={false}
          style={{
            background: "transparent",
            border: "none",
            boxShadow: "none",
            marginBottom: "30px",
          }}
        >
          <Tweets tweets={data.tweets} />
        </TabPane>
      ),
    },
    {
      menuItem: "Video",
      render: () => (
        <TabPane
          attached={false}
          style={{
            background: "transparent",
            border: "none",
            boxShadow: "none",
          }}
        ></TabPane>
      ),
    },
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    const userID = Cookies.get("userId");
    const userType = Cookies.get("userType");
    const Datas = {
      userId: userID,
      userType: userType,
    };
    if (userType === "Traveler") {
      dispatch(travelerByIdRequest(id));
    } else {
      dispatch(agencyByIdRequest(id));
    }
  }, [dispatch, id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid columns={"equal"} fluid>
            <Grid.Row>
              <Grid.Column width={16}></Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column
                textAlign="center"
                width={8}
                mobile={16}
                computer={8}
              >
                <div>
                  <div
                    style={{
                      marginTop: "-20px",
                    }}
                  >
                    <Image
                      src={data?.avatar}
                      centered
                      circular
                      style={{
                        width: "80px",
                        height: "80px",
                      }}
                    />
                    <Header
                      as={"h3"}
                      style={{
                        margin: "0",
                        color: theme.colors.white,
                        padding: "5px ",
                      }}
                    >
                      {data?.agencyName || data?.fullName}
                    </Header>
                    <Header
                      as={"h5"}
                      style={{
                        margin: "0",
                        fontWeight: "300",
                        color: theme.colors.gray,
                        marginBottom: "10px",
                      }}
                    >
                      {data?.userName || "Trivix__01"}
                    </Header>
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <Header
                      as={"h5"}
                      style={{
                        fontSize: "12px",
                        fontWeight: "300 !important",
                        color: theme.colors.gray,
                      }}
                    >
                      {data?.bio ||
                        "Explore. Dream. Discover. Your Journey Begins Here! ✈️🌍"}
                    </Header>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column width={8} mobile={16} computer={8}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "15px",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ gap: "30px !important" }}>
                    <Button
                      style={{
                        background: theme.colors.white,
                        color: theme.colors.black,
                        gap: "20px",
                      }}
                    >
                      Follow
                    </Button>
                    <a href="/chat">
                      <Button
                        style={{
                          background: theme.colors.white,
                          color: theme.colors.black,
                        }}
                      >
                        Message
                      </Button>
                    </a>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "30px",
                      textAlign: "center",
                    }}
                  >
                    <div>
                      <Header
                        style={{ margin: "0", color: theme.colors.white }}
                      >
                        {data?.followerCount?.length >= 1
                          ? data?.followerCount
                          : 0}
                      </Header>
                      <Header style={{ margin: "0", color: theme.colors.gray }}>
                        Follower
                      </Header>
                    </div>
                    <div>
                      <Header
                        style={{ margin: "0", color: theme.colors.white }}
                      >
                        {data?.followingCount?.length >= 1
                          ? data?.followingCount
                          : 0}
                      </Header>
                      <Header style={{ margin: "0", color: theme.colors.gray }}>
                        Following
                      </Header>
                    </div>
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <TabExampleSecondaryPointing panes={panes} />
        </>
      )}
    </>
  );
};

export default ProfileById;
