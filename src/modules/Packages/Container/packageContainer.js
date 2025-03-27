import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, GridColumn, Header } from "semantic-ui-react";
import CustomIcon from "../../../shared/Icon";
import { theme } from "../../../Theme/theme";
import Loader from "../../../utility/Loader";
import { allPackagesRequest, detailPackagesRequest } from "../Actions";
import Nav from "../Components/Nav";
import PackageCard from "../Components/packageCard";
import TouristCard from "../Components/TouristCard";
import TravelCards from "../Components/TravelCards";
import DetailpackageContainer from "./DetailpackageContainer";
import useWindowSize from "../../../hooks/Screen";
const PackageContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const IsMobile = width < 770;
  const handleNavigateDetailpage = (id) => {
    navigate(`/packages/${id}`);
    dispatch(detailPackagesRequest(id));
  };
  const { data, loading } = useSelector((state) => state.Allpackages);
  const { Data } = useSelector((state) => state.auth);
  const pagination = {
    page: 1,
  };
  useEffect(() => {
    dispatch(allPackagesRequest({ pagination }));
  }, [dispatch]);

  return (
    <>
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
      {Data?.agency ? (
        <a href="/create-packages">
          <div
            style={{
              position: "fixed",
              bottom: IsMobile ? "50px" : "20px",
              right: "30px",
              backgroundColor: theme.colors.orange,
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              boxShadow: "none",
              cursor: "pointer",
              zIndex: 1000,
            }}
          >
            <CustomIcon
              name="plus"
              style={{ margin: 0, color: theme.colors.white }}
            />
          </div>
        </a>
      ) : null}
    </>
  );
};

export default PackageContainer;
