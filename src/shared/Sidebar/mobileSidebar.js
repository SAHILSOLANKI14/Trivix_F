import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import menuItems from "./MobileList";
import {
  BottomNavContainer,
  MenuItem,
  NavItem,
} from "../../assets/Css/Sidebar/styled";
import CustomIcon from "../Icon";
import { theme } from "../../Theme/theme";

const BottomNav = ({ handleLogOut }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleItemClick = (url) => {
    navigate(url);
  };

  return (
    <BottomNavContainer>
      {menuItems.map((item, index) => {
        const isActive = location.pathname === item.url;

        return (
          <MenuItem
            key={index}
            onClick={() => handleItemClick(item.url)}
            active={isActive}
          >
            <NavItem>
              <CustomIcon
                name={item.icon}
                className="menu-icon"
                style={{
                  fontSize: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </NavItem>
          </MenuItem>
        );
      })}
      {/* Logout Button */}
      <MenuItem onClick={handleLogOut}>
        <NavItem>
          <CustomIcon
            name="log out"
            style={{
              fontSize: "20px",
              color: theme.colors.orange,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </NavItem>
      </MenuItem>
    </BottomNavContainer>
  );
};

export default BottomNav;
