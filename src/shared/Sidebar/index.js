import Cookies from "js-cookie";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import {
  LogoutButton,
  SidebarHeader,
  SidebarItem,
  SidebarMenu,
  SidebarWrapper,
} from "../../assets/Css/Sidebar/styled"; // Import the styled components
import ProfileCard from "../../components/Cards/ProfileCards";
import useWindowSize from "../../hooks/Screen";
import CustomIcon from "../Icon";
import menuItems from "./ListData";
import BottomNav from "./mobileSidebar"; // Import the bottom navigation bar

const CustomSidebar = () => {
  const { width } = useWindowSize();

  const DesktopSidebar = width <= 1035 ? "none" : "block";
  const MobileNav = width > 1024 ? "none" : "block";

  // const dispatch = useDispatch();
  const location = useLocation();

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
          </SidebarMenu>

          <div style={{ marginTop: "20px", width: "99%", top: "60px" }}>
            <ProfileCard />
          </div>
        </SidebarWrapper>
      </div>
      {/* Bottom Navigation for Mobile */}
      {MobileNav === "block" &&
        !["/chat", "/tweet"].some((path) =>
          location.pathname.startsWith(path)
        ) && <BottomNav />}
    </>
  );
};
export default CustomSidebar;
