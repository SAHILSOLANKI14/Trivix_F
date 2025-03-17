import styled from "styled-components";
import { Sidebar, Menu } from "semantic-ui-react";
import { theme } from "../../../Theme/theme";

// Sidebar Container
export const SidebarContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  ailgn-items: center;
`;

// Sidebar Content
export const StyledSidebar = styled(Sidebar)`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.orange};
  height: 100vh;
  width: 250px !important;
  padding: 0px;
`;

// Menu Toggle (If Needed)
export const MenuToggle = styled(Menu.Item)`
  cursor: pointer;
`;

// Sidebar Menu Items
export const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease-in-out;

  background-color: ${({ active }) =>
    active ? theme.colors.orange : "transparent"};

  .menu-icon {
    color: ${({ active }) =>
      active ? theme.colors.white : theme.colors.orange};
    font-size: 20px;
  }

  &:hover {
    background-color: ${theme.colors.orange};

    .menu-icon {
      color: ${theme.colors.white};
    }
  }
`;

// Page Content Area
export const Content = styled.div`
  padding: 20px;
  height: 100%;
`;

export const BottomNavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background-color: ${theme.colors.black};
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${theme.colors.black};
  cursor: pointer;
  font-size: 14px;
  fontweight: bold;
  padding: 10px;
  // margin-left: 25px;
  border-radius &:hover {
    background-color: ${theme.colors.orange};
    .menu-icon {
      color: ${theme.colors.primary} !important;
    }
  }
`;
export const SidebarWrapper = styled.div`
  width: 250px;
  height: 100vh;
  background-color: ${theme.colors.black};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.15);
  border-right: 1px solid ${theme.colors.white};
`;
export const SidebarHeader = styled.h2`
  color: ${theme.colors.orange};
  font-size: 22px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 20px;
`;
export const SidebarMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;
export const SidebarItem = styled.a`
  width: 90%;
  display: flex;
  align-items: center;
  color: ${({ active }) =>
    active
      ? theme.colors.white
      : theme.colors.white}; /* Change color when active */
  background-color: ${({ active }) =>
    active
      ? theme.colors.orange
      : "transparent"}; /* Change background when active */
  padding: 10px;
  gap: 10px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 800 !important;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  .menu-icon {
    color: ${({ active }) =>
      active
        ? theme.colors.white
        : theme.colors.orange}; /* Change icon color */
    font-size: 20px;
  }

  &:hover {
    background-color: ${theme.colors.orange};
    color: ${theme.colors.white};

    .menu-icon {
      color: ${theme.colors.white};
    }
  }
`;

export const LogoutButton = styled(SidebarItem)`
  margin-top: auto;
  font-weight: bold;
  color: ${theme.colors.white};
  .menu-icon {
    color: ${theme.colors.orange};
  }
  &:hover {
    background-color: ${theme.colors.orange};
    color: ${theme.colors.white};
    .menu-icon {
      color: ${theme.colors.white};
    }
  }
`;
