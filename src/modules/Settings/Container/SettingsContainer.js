import React from "react";
import SettingSidebar from "../Components/SettingSidebar";
import useWindowSize from "../../../hooks/Screen";
import SettingsHeader from "../Components/SettingSidebarHeader";

const SettingPage = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const SettingsSideNav = [
    {
      id: 1,
      name: "Profile Settings",
      url: "profile-settings",
      child: [
        { name: "Edit Profile", url: "edit-profile" },
        { name: "Saved", url: "saved" },
        { name: "Archives", url: "archives" },
      ],
    },
    {
      id: 2,
      name: "Account Settings",
      url: "account-settings",
      child: [
        { name: "Account Preferences", url: "account-preferences" },
        { name: "Privacy & Security", url: "privacy-security" },
        { name: "Deactivate Account", url: "deactivate-account" },
      ],
    },
    {
      id: 3,
      name: "Preferences",
      url: "preferences",
      child: [
        { name: "Dark Mode", url: "dark-mode" },
        { name: "Notifications", url: "notifications" },
      ],
    },
    {
      id: 4,
      name: "Help",
      url: "help",
      child: [
        { name: "Report Bugs", url: "bugs-report" },
        { name: "Feedback", url: "feedback" },
      ],
    },
  ];

  return (
    <>
      <SettingsHeader title="Settings" isMobile={isMobile} />
      <SettingSidebar SettingsSideNav={SettingsSideNav} />
    </>
  );
};

export default SettingPage;
