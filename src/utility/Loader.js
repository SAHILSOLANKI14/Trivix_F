import React from "react";
import { theme } from "../Theme/theme";
import { Header, Image } from "semantic-ui-react";
import loader from "../assets/images/giphy.gif";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "90vh",
      }}
    >
      <Image src={loader} ui={false} style={{ width: "60px" }} />
    </div>
  );
};

export default Loader;
