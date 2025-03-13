import React from "react";
import { Grid, Image, Input, Icon, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import CustomIcon from "../../../shared/Icon";
import { theme } from "../../../Theme/theme";

const ChatSidebar = ({ chatList, openChat }) => {
  return (
    <Grid.Column
      width={16}
      style={{
        overflowY: "auto",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "15px",
          marginTop: "15px",
        }}
      >
        <a href="/">
          <div style={{ display: "flex", alignItems: "center" }}>
            <CustomIcon
              name="arrow left"
              size="large"
              style={{ color: theme.colors.black, cursor: "pointer" }}
              //   color={theme.colors.orange}
            />
            <Header style={{ margin: "0px", color: theme.colors.black }}>
              Chat
            </Header>
          </div>
        </a>
        <Icon
          name="edit"
          size="large"
          style={{
            marginLeft: "auto",
            cursor: "edit outline",
            color: theme.colors.black,
          }}
        />
      </div>
      <Input
        icon="search"
        placeholder="Search..."
        fluid
        style={{ marginBottom: "15px" }}
      />
      {chatList.map((chat) => (
        <Link
          to={`/chat/${chat.id}`}
          key={chat.id}
          style={{ textDecoration: "none" }}
        >
          <div
            onClick={() => openChat(chat.id)}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 10px",
              borderBottom: `1px solid ${theme.colors.white}`,
              cursor: "pointer",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            <Image src={chat.avatar} avatar />
            <div style={{ marginLeft: "10px", flex: 1 }}>
              <Header
                as={"h4"}
                style={{ color: theme.colors.black, margin: "0" }}
              >
                {chat.name}
              </Header>
              <p style={{ fontSize: "12px", color: "gray" }}>
                {chat.lastMessage}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </Grid.Column>
  );
};

export default ChatSidebar;
