import ChatContainer from "../../Chat/Container/ChatContainer";
import TweetContainer from "../../Chat/Container/TweetContainer";
import HomeContainer from "../../Home/Container/HomeContainer";
import NotificationContainer from "../../Notifications/Container/NotificationContainer";
import PackageContainer from "../../Packages/Container/packageContainer";
import ProfileById from "../../Profile/Containers/ProfileById";
import ProfileContainer from "../../Profile/Containers/ProfileContainer";
import SettingsContainer from "../../Settings/Container/SettingsContainer";
export default [
  {
    title: "home",
    url: "/",
    component: HomeContainer,
    admin: "false",
  },
  {
    title: "packages",
    url: "/packages",
    component: PackageContainer,
    admin: "false",
  },
  {
    title: "packages",
    url: "/packages/:id",
    component: PackageContainer,
    admin: "false",
  },
  {
    title: "chat",
    url: "/chat",
    component: ChatContainer,
    admin: "false",
  },
  {
    title: "chat",
    url: "/chat/:id",
    component: ChatContainer,
    admin: "false",
  },
  {
    title: "notification",
    url: "/notification",
    component: NotificationContainer,
    admin: "false",
  },
  {
    title: "tweet",
    url: "/tweet",
    component: TweetContainer,
    admin: "false",
  },
  {
    title: "profile",
    url: "/profile",
    component: ProfileContainer,
    admin: "false",
  },
  {
    title: "profile",
    url: "/profile/:id",
    component: ProfileById,
    admin: "false",
  },
  {
    title: "settings",
    url: "/settings",
    component: SettingsContainer,
    admin: "false",
  },
];
