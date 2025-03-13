import React, { useEffect } from "react";
import { Grid, GridColumn, Header, Image } from "semantic-ui-react";
import { theme } from "../../../Theme/theme";
import Nav from "../Components/Nav";
import PackageCard from "../Components/packageCard";
import TouristCard from "../Components/TouristCard";
import TravelCards from "../Components/TravelCards";
import { useNavigate, useParams } from "react-router-dom";
import DetailpackageContainer from "./DetailpackageContainer";
import { useDispatch, useSelector } from "react-redux";
import { allPackagesRequest, detailPackagesRequest } from "../Actions";
import loader from "../../../assets/images/giphy.gif";
import Loader from "../../../utility/Loader";
const PackageContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigateDetailpage = (id) => {
    navigate(`/packages/${id}`);
    dispatch(detailPackagesRequest(id));
  };
  console.log(id);
  const { data, loading } = useSelector((state) => state.Allpackages);
  const pagination = {
    page: 1,
  };
  useEffect(() => {
    dispatch(allPackagesRequest({ pagination }));
  }, [dispatch]);

  return (
    <Grid columns="equal" style={{ height: "100%", padding: 0 }}>
      <Grid.Row style={{ display: "flex", justifyContent: "center" }}>
        {/* Main content (Image Carousel) */}
        <GridColumn
          mobile={16}
          tablet={16}
          computer={16}
          largeScreen={16}
          style={{
            marginBottom: "35px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {!id ? (
            <>
              <div style={{ position: "sticky" }}>
                <Nav />
              </div>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <PackageCard
                    data={data}
                    handleNavigateDetailpage={handleNavigateDetailpage}
                  />
                  <TouristCard
                    data={data}
                    handleNavigateDetailpage={handleNavigateDetailpage}
                  />
                </>
              )}
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "100%",
                  }}
                />
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "20px",
                      padding: "0px 25px",
                    }}
                  >
                    <Header
                      as={"h3"}
                      style={{
                        margin: "0",
                        marginLeft: "10px",
                        color: theme.colors.white,
                      }}
                    >
                      Group Trips
                    </Header>
                    <Header
                      as={"h4"}
                      style={{
                        margin: "0",
                        fontWeight: "300",
                        color: theme.colors.gray,
                        padding: 1,
                      }}
                    >
                      See All
                    </Header>
                  </div>
                  <TravelCards
                    data={data}
                    handleNavigateDetailpage={handleNavigateDetailpage}
                  />
                </>
              )}
            </>
          ) : (
            <GridColumn
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DetailpackageContainer id={id} />
            </GridColumn>
          )}
        </GridColumn>
      </Grid.Row>
    </Grid>
  );
};

export default PackageContainer;
