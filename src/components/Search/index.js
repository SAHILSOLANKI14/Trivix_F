import { debounce } from "lodash";
import React from "react";
import { Grid, Image, Search } from "semantic-ui-react";
import FilterImage from "../../assets/images/filterIcon.svg";
import useWindowSize from "../../hooks/Screen";
import { Button } from "../../shared";
import CustomIcon from "../../shared/Icon";
import { theme } from "../../Theme/theme";

const CustomeSearch = ({
  isLoading,
  value,
  results,
  handleResultSelect = () => {},
  handleSearchChange = () => {},
  filter = true,
}) => {
  const { width } = useWindowSize();

  const Desktop = width <= 1026 ? "none" : "block";
  const Mobile = width > 1024 ? "none" : "block";

  return (
    <>
      <Grid>
        <Grid.Row columns={"equal"}>
          <Grid.Column
            mobile={6}
            tablet={6}
            computer={16}
            style={{ display: Desktop }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              {/* Desktop & Tablet: Show full search bar */}
              <div style={{ display: Desktop }}>
                <Search
                  fluid
                  loading={isLoading}
                  onResultSelect={handleResultSelect}
                  onSearchChange={debounce(handleSearchChange, 500, {
                    leading: true,
                  })}
                  results={results}
                  value={value}
                />
              </div>
              {filter === false ? null : (
                <div
                  style={{
                    background: theme.colors.blue,
                    padding: "7px",
                    borderRadius: "8px",
                    display: Desktop,
                  }}
                >
                  <Button
                    style={{
                      background: "transparent",
                      padding: 0,
                      margin: 0,
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Image
                      src={FilterImage}
                      size="small"
                      style={{ width: "21px" }}
                    />
                  </Button>
                </div>
              )}

              {/* Mobile: Show only search icon */}
            </div>
          </Grid.Column>
          <Grid.Column width={6}>
            <div style={{ display: Mobile, marginLeft: "-12px" }}>
              <div style={{ display: "flex", gap: "5px" }}>
                <a href="/notification">
                  <CustomIcon
                    name="bell outline"
                    size={"large"}
                    style={{ color: theme.colors.orange }}
                  />
                </a>
                <a href="/chat">
                  <CustomIcon
                    name="comments outline"
                    size={"large"}
                    style={{ color: theme.colors.orange }}
                  />
                </a>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default CustomeSearch;
