import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { Button } from "../../../shared";
import Fields from "../../../shared/Form/Fields/Fields";
import Form from "../../../shared/Form/Form";
import Header from "../../../shared/Header";
import { theme } from "../../../Theme/theme";
import { SignupRequest, TravelerSignupRequest } from "../Actions/Actions";
import { Radio } from "semantic-ui-react";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("traveler");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { Data, loading } = useSelector((state) => state.auth);

  // Dynamic validation schema based on selected type
  const schema = yup.object().shape({
    userName: yup.string().required("User Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    ...(selected === "agency"
      ? {
          agencyName: yup.string().required("Agency Name is required"),
          agencyPhoneNo: yup.string().required("Agency Phone No is required"),
        }
      : {
          fullName: yup.string().required("TravelerFull Name is required"),
          phoneNo: yup.string().required("Phone No is required"),
        }),
  });

  const onSubmit = async (data) => {
    const finalData =
      selected === "traveler"
        ? {
            fullName: data.fullName,
            phoneNo: data.phoneNo,
            email: data.email,
            userName: data.userName,
            password: data.password,
          }
        : {
            agencyName: data.agencyName,
            agencyPhoneNo: data.agencyPhoneNo,
            email: data.email,
            userName: data.userName,
            password: data.password,
          };
    try {
      dispatch(
        selected === "traveler"
          ? TravelerSignupRequest(finalData)
          : SignupRequest(finalData)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const token = Cookies.get("user");
    if (token) {
      navigate("/auth/login");
    }
  }, [Data, navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Header
        as="h1"
        title={`Sign up as ${
          selected.charAt(0).toUpperCase() + selected.slice(1)
        }`}
        style={{
          padding: "0px",
          color: theme.colors.white,
          fontWeight: "bold",
          marginTop: "5px",
        }}
      />
      <Header
        as="h5"
        title="Please Sign up to continue using our app"
        style={{
          padding: "0px",
          color: "gray",
          fontWeight: "300",
          marginTop: "5px",
        }}
      />

      {/* Radio Button Selection */}
      <div style={{ marginBottom: "20px" }}>
        <Radio
          label={<label style={{ color: theme.colors.white }}>Traveler</label>}
          name="loginType"
          value="traveler"
          checked={selected === "traveler"}
          onChange={() => setSelected("traveler")}
          style={{ marginRight: "15px" }}
        />
        <Radio
          name="loginType"
          label={<label style={{ color: theme.colors.white }}>Agency</label>}
          value="agency"
          checked={selected === "agency"}
          onChange={() => setSelected("agency")}
        />
      </div>

      {/* Form */}
      <div
        style={{
          width: "400px",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Form onSubmit={onSubmit} validateSchemas={schema}>
          <Fields.Input
            name="userName"
            type="text"
            placeholder="Enter your User Name"
            className="login-input"
            fluid
          />
          {selected === "agency" ? (
            <>
              <Fields.Input
                name="agencyName"
                type="text"
                placeholder="Enter your Agency Name"
                className="login-input"
                fluid
              />
              <Fields.Input
                name="agencyPhoneNo"
                type="number"
                placeholder="Enter your Agency Phone No"
                className="login-input"
                fluid
              />
            </>
          ) : (
            <>
              <Fields.Input
                name="fullName"
                type="text"
                placeholder="Enter your Full Name"
                className="login-input"
                fluid
              />
              <Fields.Input
                name="phoneNo"
                type="number"
                placeholder="Enter your Phone No"
                className="login-input"
                fluid
              />
            </>
          )}
          <Fields.Input
            name="email"
            type="email"
            placeholder="Enter your Email"
            className="login-input"
            fluid
          />
          <Fields.Input
            name="password"
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter your Password"
            icon={{
              name: passwordVisible ? "eye" : "eye slash outline",
              link: true,
              onClick: () => setPasswordVisible((prev) => !prev),
            }}
            className="login-input"
            fluid
          />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              style={{
                background: theme.colors.blue,
                color: theme.colors.white,
                width: "83%",
                marginTop: "8px",
              }}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Submit"}
            </Button>
          </div>
        </Form>
      </div>
      <p
        style={{
          marginTop: "15px",
          fontSize: "12px",
          color: "gray",
        }}
      >
        Already have an account?{" "}
        <a
          href="/auth/login"
          style={{ color: theme.colors.blue, fontWeight: "bold" }}
        >
          Login
        </a>
      </p>
      {/* Extra Links */}
      <p style={{ fontSize: "12px", color: "gray" }}>
        Become Our Agency{" "}
        <a
          style={{ color: theme.colors.blue, fontWeight: "bold" }}
          onClick={() => setSelected("agency")}
        >
          Partner
        </a>
      </p>

      {/* Social Login */}
      <p style={{ fontSize: "12px", marginTop: "10px", color: "gray" }}>
        OR LOG IN BY
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          circular
          color="google plus"
          icon="google"
          style={{ background: theme.colors.gray, color: theme.colors.blue }}
        />
        <Button
          circular
          color="facebook"
          icon="facebook"
          style={{ background: theme.colors.gray, color: theme.colors.blue }}
        />
      </div>
    </div>
  );
};

export default SignupForm;
