import React from "react";
import { Grid, Header, Image } from "semantic-ui-react";
import userProfile from "../../../assets/images/Ellipse 194.svg";
import CustomeSearch from "../../../components/Search";
import CustomIcon from "../../../shared/Icon";
import { useSelector } from "react-redux";
import { theme } from "../../../Theme/theme";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { Data } = useSelector((state) => state.auth);
  const data = Data?.agency || Data?.traveler;
  const navigate = useNavigate();
  const handleClick = (id) => {
    if (id) {
      navigate(`/profile/${id}`);
    }
  };
  return (
    <Grid
      //   stackable
      style={{
        background: "transparent",
        alignItems: "center",
        padding: "5px 20px",
        marginTop: "0px",
      }}
    >
      <Grid.Row columns={2} style={{ display: "flex", alignItems: "center" }}>
        {/* Left Section - Profile & Location */}
        <Grid.Column
          computer={9}
          tablet={9}
          mobile={8}
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          {/* <a href="/profile"> */}
          <div
            style={{ display: "flex", gap: "10px" }}
            onClick={() => handleClick(data._id)}
          >
            <Image src={ data.avatar || userProfile} circular size="mini" />
            <div>
              <Header as="h5" style={{ margin: 0, color: theme.colors.black }}>
                Current Location
              </Header>
              <CustomIcon
                name="map marker alternate"
                title={data?.city || "Ahemdabad"}
                style={{ color: theme.colors.black }}
              />
            </div>
          </div>
        </Grid.Column>

        <Grid.Column
          computer={7}
          tablet={7}
          mobile={8}
          textAlign="right"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <CustomeSearch />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Nav;
