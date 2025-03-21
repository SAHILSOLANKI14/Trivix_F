import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Image, Input } from "semantic-ui-react";
import { Button } from "../../../shared";
import CustomIcon from "../../../shared/Icon";
import { theme } from "../../../Theme/theme";

const ChatBody = ({
  inputMessage,
  setInputMessage,
  sendMessage,
  messages,
  selectedChat,
}) => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Grid.Column
      width={16}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "8px",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* Chat Header */}
      {selectedChat && (
        <div
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: theme.colors.black,
            zIndex: 1000,
            padding: "5px 0px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <CustomIcon
            name="arrow left"
            size="large"
            style={{ cursor: "pointer", color: theme.colors.white }}
            onClick={() => navigate("/chat")}
          />
          <Image src={selectedChat.avatar} avatar />
          <div style={{ marginLeft: "10px", flex: 1 }}>
            <strong style={{ color: theme.colors.white }}>
              {selectedChat.name}
            </strong>
            <p style={{ fontSize: "12px", color: "gray" }}>Active Now</p>
          </div>
          <CustomIcon
            name="phone"
            size="large"
            style={{ transform: "rotate(-270deg)", color: theme.colors.white }}
          />
        </div>
      )}

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: "60px",
          scrollbarWidth: "thin",
          scrollbarColor: "white",
          marginTop: "10px",
          padding: "10px",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent: msg.type === "sent" ? "flex-end" : "flex-start",
              marginBottom: "30px",
            }}
          >
            {msg.type === "received" && (
              <Image src={selectedChat?.avatar || " "} avatar />
            )}
            <div
              style={{
                background:
                  msg.type === "sent" ? theme.colors.blue : theme.colors.bg6,
                color: msg.type === "sent" ? "#fff" : "#000",
                padding: "10px",
                borderRadius: "10px",
                maxWidth: "80%",
                fontSize: "14px",
                textAlign: "left",
                marginLeft: msg.type === "received" ? "10px" : "0",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      {selectedChat && (
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            padding: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Input
            placeholder="Send a message..."
            value={inputMessage}
            style={{ flex: 1 }}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Button
            icon="send"
            color="blue"
            style={{ marginLeft: "10px" }}
            onClick={sendMessage}
          />
        </div>
      )}
    </Grid.Column>
  );
};

export default ChatBody;
