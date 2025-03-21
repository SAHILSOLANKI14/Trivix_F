import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Header, Image, TabPane } from "semantic-ui-react";
import profilePic from "../../../assets/images/Ellipse 194.svg";
import ImageGroupSize from "../../../components/ImageGroup";
import { Button } from "../../../shared";
import { theme } from "../../../Theme/theme";
import Loader from "../../../utility/Loader";
import { agencyByIdRequest, travelerByIdRequest } from "../Actions";
import { toggleFollow } from "../Api";
import TabExampleSecondaryPointing from "../Components/Tabs";
import Tweets from "../Components/Tweets";

const ProfileById = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userType = Cookies.get("userType");

  const { data, loading } = useSelector((state) => state.profile);
  const { Data } = useSelector((state) => state.auth);

  const loggedInUserName = Data?.traveler?.userName || Data?.agency?.userName;
  const loggedInUserNameId = Data?.traveler?._id || Data?.agency?._id;
  const isOwnProfile = loggedInUserName === data?.userName;
  console.log(loggedInUserNameId);
  // State for follow status and follower count
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    if (userType === "Traveler") {
      dispatch(travelerByIdRequest(id));
    } else {
      dispatch(agencyByIdRequest(id));
    }
  }, [dispatch, id, userType]);

  useEffect(() => {
    const alreadyFollowing = data?.followers?.userId === loggedInUserNameId;
    if (alreadyFollowing === "true") {
      setIsFollowing(alreadyFollowing);
    }
    if (data) {
      setFollowersCount(data?.followers?.length || 0);
    }
    console.log(isFollowing);
  }, [data]);

  const handleToggleFollow = async () => {
    const newFollowState = !isFollowing;
    setIsFollowing(newFollowState);
    setFollowersCount((prev) => (newFollowState ? prev + 1 : prev - 1));

    try {
      await toggleFollow(data?.userName);
    } catch (error) {
      console.error("Error toggling follow:", error);
      setIsFollowing(!newFollowState); // Revert on failure
      setFollowersCount((prev) => (newFollowState ? prev - 1 : prev + 1));
    }
  };

  const panes = [
    {
      menuItem: "Post",
      render: () => (
        <TabPane
          attached={false}
          style={{ background: "transparent", border: "none" }}
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
          style={{ background: "transparent", border: "none" }}
        >
          <Tweets tweets={data?.tweets} />
        </TabPane>
      ),
    },
    ...(userType === "Agency"
      ? [
          {
            menuItem: "Packages",
            render: () => (
              <TabPane
                attached={false}
                style={{ background: "transparent" }}
              ></TabPane>
            ),
          },
        ]
      : []),
    {
      menuItem: "Video",
      render: () => (
        <TabPane
          attached={false}
          style={{ background: "transparent", border: "none" }}
        ></TabPane>
      ),
    },
  ];

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
                  <div style={{ marginTop: "-20px" }}>
                    <Image
                      src={data?.avatar || profilePic}
                      centered
                      circular
                      style={{ width: "80px", height: "80px" }}
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
                  <div style={{ marginBottom: "10px" }}>
                    <Header
                      as={"h5"}
                      style={{
                        fontSize: "12px",
                        fontWeight: "300",
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
                        {followersCount}
                      </Header>
                      <Header style={{ margin: "0", color: theme.colors.gray }}>
                        Follower
                      </Header>
                    </div>
                    <div>
                      <Header
                        style={{ margin: "0", color: theme.colors.white }}
                      >
                        {data?.following ? data?.following?.length : 0}
                      </Header>
                      <Header style={{ margin: "0", color: theme.colors.gray }}>
                        Following
                      </Header>
                    </div>
                  </div>
                  {isOwnProfile ? (
                    <div style={{ gap: "30px" }}>
                      <Button
                        style={{
                          background: theme.colors.white,
                          color: theme.colors.black,
                        }}
                      >
                        Edit Profile
                      </Button>
                    </div>
                  ) : (
                    <div style={{ gap: "30px" }}>
                      <Button
                        style={{
                          background: isFollowing
                            ? theme.colors.red
                            : theme.colors.white,
                          color: theme.colors.black,
                        }}
                        onClick={handleToggleFollow}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
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
                  )}
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
