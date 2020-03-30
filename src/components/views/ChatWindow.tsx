/*
This component is the container for all chat functionality: composing and sending messages, reading earlier chats and displaying participants.
*/

import React, { useEffect, useState } from "react";
import "../chat-window/chat.scss";
import ChatOutput from "../chat-window/ChatOutput";
import ChatParticipants from "../laura-test-area/ChatParticipants";
import ComposeMessage from "../chat-window/ComposeMessage";
import { getUsers, getChats } from "../../services/chat";
import { ChatUser, ChatMessage } from "../chat-window/types";
import MyChats from "../chat-window/MyChats";
import io from "socket.io-client";

interface Props {}

const ChatWindow = (props: Props) => {
  // const [chatUsers, setChatUsers] = useState<[]>([]);
  const [chatDetails, setChatDetails] = useState<any>([]);
  const [chats, setChats] = useState<any>([]);
  const [messages, setMessages] = useState<any>();
  const myUserId = 2;
  const myName = "John Doe";

  // Open socket connection
  const socket = io("http://localhost:9000");

  const myChats = async () => {
    let chatList = await getChats(myUserId);
    setChats(chatList);
  };

  useEffect(() => {
    myChats();
  }, []);

  socket
    // Join chat
    .emit("joinChat", myName, chatDetails.id)

    // Receive messages from socket
    .on("message", (message: string) => {
      console.log(message);
    })

    .on("new message", (message: any) => {
      let newMessage = message;
      setMessages(newMessage);
    })

    .on("typing", (user: string) => {
      console.log(`<p><em>${user} is typing a message...</em></p>`);
    })

    .on("user disconnect", (offlineMessage: string) => {
      console.log(offlineMessage);
    });

  // return () => {
  //   socket.off("disconnet");
  // };

  const selectedChat = (data: any) => {
    setChatDetails(data);
  };

  const emitMessage = async (message: any) => {
    // Emmiting a chat message to server
    socket.emit("chatMessage", message);
  };

  return (
    <div className="ChatWindow">
      <MyChats selectedChat={selectedChat} chats={chats} />
      <ChatOutput
        chatDetails={chatDetails}
        myUserId={myUserId}
        myName={myName}
        newMessage={messages}
      />
      <ComposeMessage
        chatDetails={chatDetails}
        myUserId={myUserId}
        myName={myName}
        emitMessage={emitMessage}
      />
    </div>
  );
};

export default ChatWindow;
