import LoginContainer from "../Container/LoginContainer";
import SignupContainer from "../Container/SignupContainer";
export default [
  {
    title: "login",
    url: "/auth/login",
    component: LoginContainer,
    admin: "false",
  },
  {
    title: "signup",
    url: "/auth/signup",
    component: SignupContainer,
    admin: "false",
  },
];
