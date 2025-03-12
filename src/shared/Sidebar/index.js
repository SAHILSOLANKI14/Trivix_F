import Cookies from "js-cookie";
import React from "react";
import { useDispatch } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import styled from "styled-components";
import {
  LogoutButton,
  SidebarHeader,
  SidebarItem,
  SidebarMenu,
  SidebarWrapper,
} from "../../assets/Css/Sidebar/styled"; // Import the styled components
import ProfileCard from "../../components/Cards/ProfileCards";
import { logout } from "../../modules/Auth/Actions/Actions";
import CustomIcon from "../Icon";
import menuItems from "./ListData";
import BottomNav from "./mobileSidebar"; // Import the bottom navigation bar
import { useLocation, useNavigate } from "react-router-dom";
import useWindowSize from "../../hooks/Screen";

const CustomSidebar = () => {
  const { width } = useWindowSize();

  const DesktopSidebar = width <= 1035 ? "none" : "block";
  const MobileNav = width > 1024 ? "none" : "block";

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    // Cookies.remove("accessToken");
    localStorage.removeItem("persist:root");
    navigate("/auth/login");
  };

  return (
    <>
      {/* Sidebar for Desktop */}
      <div style={{ display: DesktopSidebar }}>
        <SidebarWrapper>
          <SidebarHeader>Explorify</SidebarHeader>
          <SidebarMenu>
            {menuItems.map((item, index) => (
              <SidebarItem
                key={index}
                href={item.url}
                active={location.pathname === item.url}
              >
                <CustomIcon name={item.icon} className="menu-icon" />
                {item.name}
              </SidebarItem>
            ))}
            <LogoutButton onClick={handleLogOut}>
              <CustomIcon name="log out" className="menu-icon" />
              Logout
            </LogoutButton>
          </SidebarMenu>

          <div style={{ marginTop: "20px", width: "99%", top: "60px" }}>
            <ProfileCard />
          </div>
        </SidebarWrapper>
      </div>
      {/* Bottom Navigation for Mobile */}
      {!location.pathname.startsWith("/chat") && (
        <div style={{ display: MobileNav }}>
          <BottomNav handleLogOut={handleLogOut} />
        </div>
      )}
    </>
  );
};
export default CustomSidebar;
