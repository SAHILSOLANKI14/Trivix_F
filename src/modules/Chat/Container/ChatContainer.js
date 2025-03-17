import React from "react";
import ChatApp from "../Components/ChatComponent";

const ChatContainer = () => {
  const chatList = [
    {
      id: 1,
      name: "Jeel",
      lastMessage: "Hi, David. Hope you're doing...",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: 2,
      name: "Param",
      lastMessage: "Are you coming?",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      id: 3,
      name: "Het",
      lastMessage: "See you tomorrow!",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },
  ];

  const messagesData = {
    1: [
      { id: 1, text: "Are you still travelling?", type: "received" },
      { id: 2, text: "Yes, I'm at India..", type: "sent" },
      { id: 3, text: "OoOo, That's so Cool!", type: "received" },
    ],
    2: [
      { id: 1, text: "Hey! Are you free?", type: "received" },
      { id: 2, text: "Yes, what's up?", type: "sent" },
    ],
    3: [
      { id: 1, text: "Let's meet at 5?", type: "received" },
      { id: 2, text: "Sure!", type: "sent" },
    ],
  };
  return <ChatApp messagesData={messagesData} chatList={chatList} />;
};

export default ChatContainer;
