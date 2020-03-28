/*
This component is the container for all chat functionality: composing and sending messages, reading earlier chats and displaying participants.
*/

import React, { useEffect, useState } from "react";
import "../chat-window/chat.scss";
import ChatOutput from "../chat-window/ChatOutput";
import ChatParticipants from "../chat-window/ChatParticipants";
import ComposeMessage from "../chat-window/ComposeMessage";
import { getUsers } from "../../services/chat";
import { ChatUser } from "../laura-test-area/types";

interface Props {

}

const ChatWindow = (props: Props) => {
  const [chatUsers, setChatUsers] = useState<[]>([]);
  const [chatDetails, setChatDetails] = useState<[]>([]);

  const allUsers = async () => {
    let users = await getUsers();
    setChatUsers(users);
  };

  useEffect(() => {
    allUsers();
  }, []);

  const selectedChat = (data: any) => {
    setChatDetails(data);
  };

  return (
    <div className="ChatWindow">
      <ChatParticipants users={chatUsers} selectedChat={selectedChat} />
      <ChatOutput chatDetails={chatDetails}/>
      <ComposeMessage chatDetails={chatDetails}/>
    </div>
  );
};

export default ChatWindow;
