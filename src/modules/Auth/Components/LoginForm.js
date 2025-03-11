import React, { useEffect, useState } from "react";
import Form from "../../../shared/Form/Form";
import Fields from "../../../shared/Form/Fields/Fields";
import * as yup from "yup";
import Header from "../../../shared/Header";
import { theme } from "../../../Theme/theme";
import { Button } from "../../../shared";
import {
  loginFailure,
  loginRequest,
  TravelerloginFailure,
  TravelerloginRequest,
} from "../Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Radio } from "semantic-ui-react";
import ToastMessage from "../../../utility/Toast";
import Cookies from "js-cookie";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Data, loading } = useSelector((state) => state.auth);
  const [selected, setSelected] = useState("traveler");
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  };

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    userName: yup
      .string()
      .test(
        "is-valid",
        "Enter a valid username, email, or phone number",
        (value) =>
          /^[a-zA-Z0-9._-]+$/.test(value) ||
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
          /^[0-9]{10,15}$/.test(value)
      )
      .required("Username, email, or phone number is required"),
  });

  const determineInputType = (input) => {
    if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input)) {
      return "email";
    } else if (/^[0-9]{10,15}$/.test(input)) {
      return "phoneNo";
    } else {
      return "userName";
    }
  };

  const onSubmit = async (data) => {
    const inputType = determineInputType(data.userName);

    const finalData = {
      [inputType]: data.userName, // dynamically assign the correct field
      password: data.password,
      toastCallback: showToast,
    };

    try {
      dispatch(
        selected === "traveler"
          ? TravelerloginRequest(finalData)
          : loginRequest(finalData)
      );
    } catch (error) {
      dispatch(
        selected === "traveler"
          ? TravelerloginFailure(error.message)
          : loginFailure(error.message)
      );
    }
  };

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      showToast("Login successful!", "success");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [Data, navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        width: "100%",
      }}
    >
      <Header
        as={"h1"}
        title={`Sign in as ${
          selected.charAt(0).toUpperCase() + selected.slice(1)
        }`}
        style={{
          padding: "0px",
          color: theme.colors.black,
          fontWeight: "bold",
          marginTop: "5px",
        }}
      />
      <Header
        as={"h5"}
        title={"Please Sign in to continue our app"}
        style={{
          padding: "0px",
          color: "gray",
          fontWeight: "300",
          marginTop: "5px",
        }}
      />

      <div style={{ marginBottom: "20px" }}>
        <Radio
          label="Traveler"
          name="loginType"
          value="traveler"
          checked={selected === "traveler"}
          onChange={() => setSelected("traveler")}
          style={{ marginRight: "15px" }}
        />
        <Radio
          label="Agency"
          name="loginType"
          value="agency"
          checked={selected === "agency"}
          onChange={() => setSelected("agency")}
        />
      </div>

      <div style={{ width: "400px", padding: "20px", borderRadius: "8px" }}>
        <Form onSubmit={onSubmit} validateSchemas={schema}>
          <Fields.Input
            name="userName"
            type="text"
            placeholder="Enter Username, Email, or Phone Number"
            className="login-input"
            fluid
          />
          <Fields.Input
            name="password"
            type="password"
            placeholder="Enter your password"
            icon="eye outlined"
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
              {loading ? "Logging in..." : "Submit"}
            </Button>
          </div>
        </Form>
      </div>

      <p style={{ marginTop: "15px", fontSize: "12px" }}>
        Don't have an account?{" "}
        <a href="/auth/signup" style={{ color: "#ff6b6b", fontWeight: "bold" }}>
          Sign up
        </a>
      </p>

      <p style={{ fontSize: "12px" }}>
        Become Our Agency{" "}
        <a href="#" style={{ color: "#ff6b6b", fontWeight: "bold" }}>
          Partner
        </a>
      </p>

      <p style={{ fontSize: "12px", marginTop: "10px" }}>OR LOG IN BY</p>
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
      {toast.visible && (
        <ToastMessage
          message={toast.message}
          type={toast.type}
          visible={toast.visible}
        />
      )}
    </div>
  );
};

export default LoginForm;
