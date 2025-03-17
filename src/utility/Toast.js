import React from "react";
import { Message, Transition } from "semantic-ui-react";

const ToastMessage = ({ message, type, visible }) => {
  return (
    <Transition visible={visible} animation="fade down" duration={500}>
      <Message
        floating
        positive={type === "success"}
        negative={type === "error"}
        info={type === "info"}
        warning={type === "warning"}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          maxWidth: "300px",
        }}
      >
        <Message.Header>{message}</Message.Header>
      </Message>
    </Transition>
  );
};

export default ToastMessage;
