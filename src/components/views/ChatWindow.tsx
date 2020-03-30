/*
This component is the container for all chat functionality: composing and sending messages, reading earlier chats and displaying participants.
*/

import "../chat-window/chat.scss";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ChatOutput from "../chat-window/ChatOutput";
import ComposeMessage from "../chat-window/ComposeMessage";
import { ChatMessage } from "../chat-window/types";
import MyChats from "../chat-window/MyChats";
import io from "socket.io-client";

interface Props {
  user: any;
  match: any;
}

const ChatWindow = (props: Props) => {
  const [chatID] = useState<number>(props.match.params.chatid);
  const [messages, setMessages] = useState<ChatMessage>();
  const [typingInfo, setTypingInfo] = useState<any>();
  const [myUserId, setMyUsedID] = useState<number>(props.user.id);
  const [myName, setMyName] = useState<string>(props.user.name);
  const [myPicture, setMyPicture] = useState<string>(props.user.image_url);
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    setMyUsedID(props.user.id);
    setMyName(props.user.name);
    setMyPicture(props.user.image_url);
    // myChats();
  }, [props.user.id]);

  useEffect(() => {
    // Open socket connection
    const socket = io("http://localhost:9000");
    setSocket(socket);

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
          setMessages(newMessage);
        }
      })

      .on("typing", async (user: string) => {
        let typer = user;
        setTypingInfo(typer);
      })

      .on("user disconnect", (offlineMessage: string) => {
        console.log(offlineMessage);
      });
  }, []);

  const emitMessage = (message: any) => {
    // Emmiting a chat message to server
    if (chatID === message.chat) {
      socket.emit("chatMessage", message);
    }
  };

  const typingMessage = (username: string, id: number) => {
    socket.emit("typing", myName, chatID);
  };

  return (
    <div className="ChatWindow">
      <MyChats />
      <ChatOutput
        chatID={chatID}
        myUserId={myUserId}
        myName={myName}
        myPicture={myPicture}
        newMessage={messages}
        typingInfo={typingInfo}
      />
      <ComposeMessage
        chatID={chatID}
        myUserId={myUserId}
        myName={myName}
        myPicture={myPicture}
        emitMessage={emitMessage}
        typingMessage={typingMessage}
      />
    </div>
  );
};

// export default ChatWindow;

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(ChatWindow);
