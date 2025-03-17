import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import ChatBody from "./ChatBody";
import ChatSidebar from "./ChatSidebar";

const ChatApp = ({ messagesData, chatList }) => {
  const { id } = useParams();
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  // Load messages from localStorage on component mount
  useEffect(() => {
    if (id) {
      const savedMessages = localStorage.getItem(`chat_${id}`);
      setMessages(
        savedMessages ? JSON.parse(savedMessages) : messagesData[id] || []
      );
    }
  }, [id, messagesData]);

  const openChat = (chatId) => {
    setSelectedChat(chatList.find((chat) => chat.id === chatId));
    const savedMessages = localStorage.getItem(`chat_${chatId}`);
    setMessages(
      savedMessages ? JSON.parse(savedMessages) : messagesData[chatId] || []
    );
  };

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessages = [
      ...messages,
      {
        id: Date.now(),
        text: inputMessage,
        type: "sent",
      },
    ];
    setMessages(newMessages);
    localStorage.setItem(
      `chat_${id}`,
      JSON.stringify(newMessages, ...chatList)
    ); // Save to localStorage
    setInputMessage("");
  };

  return (
    <Grid
      divided
      style={{ border: "none", boxShadow: "none", padding: "0px 20px" }}
    >
      {!id && <ChatSidebar chatList={chatList} openChat={openChat} />}
      {id && (
        <ChatBody
          chatId={id}
          chatList={chatList}
          messagesData={messagesData}
          messages={messages}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          sendMessage={sendMessage}
          selectedChat={selectedChat}
        />
      )}
    </Grid>
  );
};

export default ChatApp;
