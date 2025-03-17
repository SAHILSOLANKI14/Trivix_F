import { useMediaQuery } from "@react-hook/media-query";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, GridColumn } from "semantic-ui-react";
import ChatBox from "../../../components/Chat";
import ImageCarousel from "../../../components/PostsBlog";
import Loader from "../../../utility/Loader";
import Nav from "../../Packages/Components/Nav";
import { allPostsRequest } from "../Actions";
import { theme } from "../../../Theme/theme";

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

              borderRight: !isMobile
                ? `1px solid ${theme.colors.white}`
                : "none",
              borderTop: !isMobile ? `1px solid ${theme.colors.white}` : "none",
            }}
          >
            {loading ? (
              <Loader />
            ) : (
              <div
                style={{
                  marginTop: isMobile ? "-15px" : "0px",
                }}
              >
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
              style={{ padding: 0 }}
            >
              <div
                style={{
                  position: "sticky",
                  top: "0px",
                  padding: 0,
                  borderTop: `1px solid ${theme.colors.white}`,
                }}
              >
                <div
                  style={{
                    marginBottom: "20px",
                  }}
                >
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
