import React, { useEffect } from "react";
import { Grid, GridColumn, Header, Image } from "semantic-ui-react";
import ImageCarousel from "../../../components/PostsBlog";
import ChatBox from "../../../components/Chat";
import { useMediaQuery } from "@react-hook/media-query";
import Nav from "../../Packages/Components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { allPostsRequest } from "../Actions";
import loader from "../../../assets/images/giphy.gif";
import { theme } from "../../../Theme/theme";
import { getAllTweetsRequest } from "../../Profile/Actions";

const HomeContainer = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const isLaptop = useMediaQuery("(max-width: 1440px)");
  const { data, loading } = useSelector((state) => state.AllPost);
  useEffect(() => {
    dispatch(allPostsRequest());
    dispatch(getAllTweetsRequest());
  }, [dispatch]);
  const posts = data;
  return (
    <>
      <Nav />
      <Grid>
        <Grid.Row
          style={{
            display: "flex",
            justifyContent: "center ",
            margin: "0px !important",
          }}
        >
          <GridColumn
            mobile={16}
            tablet={16}
            computer={isMobile ? 16 : 11}
            largeScreen={10}
            style={{
              marginBottom: "50px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "80vh",
                  width: "100%",
                }}
              >
                <Image
                  src={loader}
                  ui={true}
                  style={{ width: "60px", marginLeft: "-10px" }}
                />
                <Header as="h2" style={{ color: theme.colors.white }}>
                  Loading...
                </Header>
              </div>
            ) : (
              <div style={{ marginTop: isMobile ? "-15px" : "0px" }}>
                <ImageCarousel
                  posts={posts}
                  isLaptop={isLaptop}
                  isMobile={isMobile}
                />
              </div>
            )}
          </GridColumn>
          {!isMobile && (
            <GridColumn
              mobile={16}
              tablet={16}
              computer={isMobile ? 16 : 5}
              largeScreen={6}
            >
              <div style={{ position: "sticky", top: "10px" }}>
                <div style={{ marginBottom: "20px" }}>
                  <ChatBox />
                </div>
              </div>
            </GridColumn>
          )}
        </Grid.Row>
      </Grid>
    </>
  );
};

export default HomeContainer;
