import React, { useEffect } from "react";
import { Grid, GridColumn, Header, Image } from "semantic-ui-react";
import ImageCarousel from "../../../components/PostsBlog";
import ChatBox from "../../../components/Chat";
import img from "../../../assets/images/pexels-souvenirpixels-414612.jpg";
import img2 from "../../../assets/images/ai-generated-mysterious-dark-forest-with-stars-in-the-sky-night-forest-with-full-moon-and-stars-in-the-sky-photo.jpg";
import img3 from "../../../assets/images/ai-generated-mysterious-night-sky-illuminates-tranquil-forest-revealing-cosmic-beauty-generated-by-ai-photo.jpg";
import NotificationBar from "../../../components/Notification";
import { useMediaQuery } from "@react-hook/media-query";
import Nav from "../../Packages/Components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { allPostsRequest } from "../Actions";
import loader from "../../../assets/images/giphy.gif";

const HomeContainer = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const isLaptop = useMediaQuery("(max-width: 1440px)");
  const { data, loading } = useSelector((state) => state.AllPost);
  useEffect(() => {
    dispatch(allPostsRequest());
  }, [dispatch]);
  const posts = data;
  return (
    <>
      <Grid columns="equal" style={{ height: "100%" }}>
        <Grid.Row style={{ display: "flex", justifyContent: "center " }}>
          <GridColumn
            mobile={16}
            tablet={16}
            computer={isMobile ? 16 : 11}
            largeScreen={10}
            style={{
              marginBottom: "50px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center ",
              gap: "10px",
            }}
          >
            <Nav />
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "100vh",
                  width: "100%",
                }}
              >
                <Image
                  src={loader}
                  ui={true}
                  style={{ width: "60px", marginLeft: "-10px" }}
                />
                <Header as="h2">Loading...</Header>
              </div>
            ) : (
              <ImageCarousel
                posts={posts}
                isLaptop={isLaptop}
                isMobile={isMobile}
              />
            )}
          </GridColumn>
          {!isMobile && (
            <GridColumn
              mobile={16}
              tablet={16}
              computer={isMobile ? 16 : 5}
              largeScreen={6}
            >
              <div>
                <div style={{ marginBottom: "20px" }}>
                  <ChatBox />
                </div>
                <div>
                  <NotificationBar />
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
