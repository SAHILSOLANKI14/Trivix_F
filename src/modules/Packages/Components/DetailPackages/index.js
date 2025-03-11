import React, { useEffect, useState } from "react";
import { Image, Grid, Header, List, Transition } from "semantic-ui-react";
import CustomIcon from "../../../../shared/Icon/index";
import bg from "../../../../assets/images/Group 1000001786 (1).png";
import { theme } from "../../../../Theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { detailPackagesRequest } from "../../Actions";
import loader from "../../../../assets/images/giphy.gif";
import useWindowSize from "../../../../hooks/Screen";
import { Button } from "../../../../shared/index";
import { useNavigate } from "react-router-dom";
import CustomSlider from "../../../../components/Slider";
import vector from "../../../../assets/images/Vector.svg";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  centerMode: true,
  centerPadding: "30px",
  responsive: [
    { breakpoint: 1444, settings: { slidesToShow: 3 } },
    { breakpoint: 1025, settings: { slidesToShow: 2, centerPadding: "0px" } },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2, slidesToScroll: 1, centerPadding: "0px" },
    },
    {
      breakpoint: 450,
      settings: { slidesToShow: 2, slidesToScroll: 1, centerPadding: "12px" },
    }, // Mobile: 1 Image per slide
  ],
};
const DetailPackagePage = ({ id }) => {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const size = width < 768 ? "small" : "16px";
  const [showMore, setShowMore] = useState(false);

  const { detailData, loading } = useSelector((state) => state.Allpackages);
  const [bannerImage, setbannerImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(detailPackagesRequest(id));
  }, [dispatch, id]);

  const handleBack = () => {
    navigate("/packages");
  };

  const styles = {
    imageContainer: {
      padding: "5px 10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100px",
      overflow: "hidden",
    },
    image: {
      width: isMobile ? "210px" : "270px",
      height: " 150px",
      objectFit: "cover",
      padding: "0px 3px",
    },
  };
  return (
    <div
      style={{
        padding: "0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100%",
      }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Image src={loader} ui={false} style={{ width: "60px" }} />
          <Header as="h2" style={{ marginTop: "10px" }}>
            Loading...
          </Header>
        </div>
      ) : (
        <div
          style={{
            borderRadius: isMobile ? "0px" : "12px",
            overflow: "hidden",
            boxShadow: "none",
            background: "white",
            marginTop: isMobile ? "0px" : "0px",
            maxWidth: "max-content",
            // padding: "20px",
          }}
        >
          <Grid
            stackable
            columns={isMobile ? 1 : 2}
            style={{ padding: "0px" }}
            fluid
            width={16}
          >
            <Grid.Column>
              <div style={{ position: "relative" }}>
                <Image
                  src={bannerImage || detailData?.photos[0]}
                  ui={true}
                  style={{
                    maxWidth: "100%",
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    marginBottom: "-15px",
                  }}
                />
                <CustomIcon
                  name="arrow left"
                  style={{
                    position: "absolute",
                    top: 35,
                    left: 25,
                    color: "white",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                  onClick={handleBack}
                />
              </div>
              <div style={{ padding: "10px 0px" }}>
                <CustomSlider settings={settings}>
                  {detailData?.photos.map((item, index) => (
                    <div
                      key={index}
                      style={styles.imageContainer}
                      onClick={() => setbannerImage(item)}
                    >
                      <Image src={item} style={styles.image} />
                    </div>
                  ))}
                </CustomSlider>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div
                style={{
                  padding: isMobile ? "20px" : "30px 10px 10px 10px",
                  marginBottom: "0px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Header
                    as="h2"
                    style={{
                      color: theme.colors.orange,
                      display: "flex",
                      alignItems: "center",
                      margin: "0",
                    }}
                  >
                    {detailData?.title || ""}
                  </Header>
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <Button
                      size="large"
                      style={{
                        background: theme.colors.blue,
                        color: theme.colors.white,
                        padding: isMobile ? "10px" : "10px",
                      }}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
                <Header
                  as="h4"
                  style={{
                    color: theme.colors.gray,
                    margin: 0,
                    paddingBottom: "20px",
                  }}
                >
                  {detailData?.agency.agencyName}
                </Header>
                <Grid columns={3} textAlign="center">
                  <Grid.Row>
                    <Grid.Column
                      width={7}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 0,
                      }}
                    >
                      <CustomIcon name="map marker alternate" />
                      <Header as="h4" style={{ margin: 0 }}>
                        {detailData?.mainLocation || ""}
                      </Header>
                    </Grid.Column>
                    <Grid.Column
                      width={2}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 0,
                      }}
                    >
                      <CustomIcon name="exchange" />
                    </Grid.Column>
                    <Grid.Column
                      width={7}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 0,
                      }}
                    >
                      <CustomIcon name="map marker alternate" />
                      <Header as="h4" style={{ margin: 0 }}>
                        {detailData?.fromLocation || ""}
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>

              <div style={{ padding: "20px" }}>
                <Header as="h4">About Destination</Header>
                <p>{detailData?.description}</p>
                <Transition
                  visible={showMore}
                  animation="slide down"
                  duration={800}
                >
                  <div style={{ marginBottom: "20px" }}>
                    <List bulleted>
                      {detailData?.itinerary?.map((item, index) => (
                        <List.Item key={index}>
                          <strong>Day {item.day}:</strong> {item.description}
                        </List.Item>
                      ))}
                    </List>
                  </div>
                </Transition>

                <Button
                  size="small"
                  primary
                  onClick={() => setShowMore((prev) => !prev)}
                >
                  {showMore ? "Less More" : "Read More"}
                </Button>
              </div>

              <div style={{ padding: "20px" }}>
                <Grid columns={2} divided>
                  <Grid.Row>
                    <Grid.Column>
                      <Header as="h4">Services & Facilities</Header>
                      <List bulleted>
                        {detailData?.servicesAndFacilities?.flatMap(
                          (service, index) =>
                            typeof service === "string"
                              ? service.split(",").map((item, i) => (
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: "5px",
                                      gap: "10px",
                                    }}
                                  >
                                    <Image
                                      src={vector}
                                      style={{ width: "20px", height: "20px" }}
                                    ></Image>
                                    <List.Item
                                      key={`${index}-${i}`}
                                      style={{
                                        fontSize: "14px",
                                        color: theme.colors.gray,
                                      }}
                                    >
                                      {item.trim()}
                                    </List.Item>
                                  </div>
                                ))
                              : null
                        )}
                      </List>
                    </Grid.Column>
                    <Grid.Column style={{ boxShadow: "none" }}>
                      <Header as="h4">Activities</Header>

                      {detailData?.activities?.flatMap((activity, index) =>
                        typeof activity === "string"
                          ? activity.split(",").map((item, i) => (
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "5px",
                                    gap: "10px",
                                  }}
                                >
                                  <Image
                                    src={vector}
                                    style={{ width: "20px", height: "20px" }}
                                  ></Image>
                                  <List.Item
                                    key={`${index}-${i}`}
                                    style={{
                                      fontSize: "14px",
                                      color: theme.colors.gray,
                                    }}
                                  >
                                    {item.trim()}
                                  </List.Item>
                                </div>
                              </>
                            ))
                          : null
                      )}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>

              <div style={{ padding: "20px" }}>
                <Grid columns={3}>
                  <Grid.Row>
                    <Grid.Column>
                      <Header as="h4" style={{ fontSize: size }}>
                        Price:
                      </Header>
                      <p style={{ color: theme.colors.gray }}>
                        ₹{detailData?.price || "N/A"}
                      </p>
                    </Grid.Column>
                    <Grid.Column>
                      <Header as="h4" style={{ fontSize: size }}>
                        Available Slots:
                      </Header>
                      <p style={{ color: theme.colors.gray }}>
                        {detailData?.availableSlots || "N/A"}
                      </p>
                    </Grid.Column>
                    <Grid.Column>
                      <Header as="h4" style={{ fontSize: size }}>
                        Max Slots:
                      </Header>
                      <p style={{ color: theme.colors.gray }}>
                        {detailData?.maxSlots || "N/A"}
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default DetailPackagePage;
