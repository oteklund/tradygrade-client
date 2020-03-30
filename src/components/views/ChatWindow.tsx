/*
This component is the container for all chat functionality: composing and sending messages, reading earlier chats and displaying participants.
*/

import "../chat-window/chat.scss";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ChatOutput from "../chat-window/ChatOutput";
import ChatParticipants from "../laura-test-area/ChatParticipants";
import ComposeMessage from "../chat-window/ComposeMessage";
import { getUsers, getChats } from "../../services/chat";
import { ChatUser, ChatMessage } from "../chat-window/types";
import MyChats from "../chat-window/MyChats";
import io from "socket.io-client";

interface Props {
  user: any;
  match: any;
}

const ChatWindow = (props: Props) => {
  const [chatID, setChatId] = useState<number>(props.match.params.chatid);
  const [chats, setChats] = useState<any>([]);
  const [messages, setMessages] = useState<any>();
  const [myUserId, setMyUsedID] = useState<number>(props.user.id);
  const [myName, setMyName] = useState<string>(props.user.name);
  const [myPicture, setMyPicture] = useState<string>(props.user.image_url)

  // Open socket connection
  const socket = io("http://localhost:9000");

  // socket
  socket

    // Join chat
    .emit("joinChat", myName, chatID)

    // Receive messages from socket
    .on("message", (message: string) => {
      console.log(message);
    })

    // Receive chat nmessage
    .on("new message", (message: any) => {
      let newMessage = message;
      if (chatID === newMessage.chat) {
        console.log(chatID);
        console.log(newMessage);
        setMessages(newMessage);
      }
    })

    .on("typing", (user: string) => {
      console.log(`<p><em>${user} is typing a message...</em></p>`);
    })

    .on("user disconnect", (offlineMessage: string) => {
      console.log(offlineMessage);
    });

  const myChats = async () => {
    let chatList = await getChats(props.user.id);
    setChats(chatList);
  };

  useEffect(() => {
    setMyUsedID(props.user.id);
    setMyName(props.user.name);
    setMyPicture(props.user.image_url)
    myChats();
  }, [myUserId]);

  const emitMessage = (message: any) => {
    // Emmiting a chat message to server
    if (chatID === message.chat) {
      socket.emit("chatMessage", message);
    }
  };

  return (
    <div className="ChatWindow">
      <MyChats chats={chats} />
      <ChatOutput
        chatID={chatID}
        myUserId={myUserId}
        myName={myName}
        myPicture={myPicture}
        newMessage={messages}
      />
      <ComposeMessage
        chatID={chatID}
        myUserId={myUserId}
        myName={myName}
        myPicture={myPicture}
        emitMessage={emitMessage}
      />
    </div>
  );
};

// export default ChatWindow;

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(ChatWindow);
