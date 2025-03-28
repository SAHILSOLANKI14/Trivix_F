import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { List } from "semantic-ui-react";
import { theme } from "../../../Theme/theme";
import CustomIcon from "../../../shared/Icon";
const SettingSidebar = ({ SettingsSideNav }) => {
  const navigate = useNavigate();
  const [openCategory, setOpenCategory] = useState(null);
  const handleToggle = (id) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  const handleLogOut = () => {
    // dispatch(logout());
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("userType");
    Cookies.remove("userId");
    Cookies.remove("user");
    localStorage.removeItem("persist:root");
    navigate("/auth/login");
  };

  return (
    <div style={{ padding: "15px" }}>
      <List divided relaxed>
        {SettingsSideNav.map((category) => (
          <div key={category.id}>
            {/* Main Category */}
            <List.Item
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px",
                borderBottom: `1px solid ${theme.colors.gray}`,
                cursor: "pointer",
              }}
              onClick={() => handleToggle(category.id)}
            >
              <List.Content>
                <List.Header style={{ color: theme.colors.white }}>
                  {category.name}
                </List.Header>
              </List.Content>
              {category.child && (
                <CustomIcon
                  style={{ color: theme.colors.white }}
                  name={
                    openCategory === category.id ? "chevron up" : "chevron down"
                  }
                />
              )}
            </List.Item>

            {/* Child Items */}
            {openCategory === category.id && category.child && (
              <List.List style={{ paddingLeft: "20px" }}>
                {category.child.map((childItem) => (
                  <List.Item key={childItem.url} style={{ padding: "10px 0" }}>
                    <Link
                      to={`/settings/${childItem.url}`}
                      style={{
                        textDecoration: "none",
                        color: theme.colors.white,
                      }}
                    >
                      <List.Content>
                        <List.Header style={{ color: theme.colors.gray }}>
                          {childItem.name}
                        </List.Header>
                      </List.Content>
                    </Link>
                  </List.Item>
                ))}
              </List.List>
            )}
          </div>
        ))}
        <List.Item
          style={{
            display: "flex",
            alignItems: "center",
            padding: "15px",
            borderBottom: `1px solid ${theme.colors.gray}`,
            cursor: "pointer",
            color: theme.colors.white,
          }}
          onClick={handleLogOut}
        >
          <List.Content>
            <List.Header style={{ color: theme.colors.white }}>Logout</List.Header>
          </List.Content>
          <CustomIcon style={{ color: theme.colors.white }} name="log out" />
        </List.Item>
      </List>
    </div>
  );
};

export default SettingSidebar;
