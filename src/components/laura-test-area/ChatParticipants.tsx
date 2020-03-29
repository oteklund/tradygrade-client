/*
This component displays the participant names and pictures in the chat window.
*/
import React, { useEffect, useState } from "react";
import { ChatUser } from "../chat-window/types";
import ChatBlock from "./ChatBlock";

interface Props {
  users: any;
  selectedChat: any
}

const ChatParticipants = (props: Props) => {
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);

  useEffect(() => {
    for (let user of props.users) {
      setChatUsers(chatUsers => [
        ...chatUsers,
        {
          id: user.id,
          user: user.name,
          picture: user.picture
        }
      ]);
    }
  }, [props.users]);

  return (
    <div className="ChatParticipants">
      <h3>ChatParticipants</h3>
      <div id="userList" >
        {chatUsers.map(chatUser => (<ChatBlock chatUser={chatUser} key={chatUser.id} selectedChat={props.selectedChat}/>))}
      </div>
    </div>
  );
};

export default ChatParticipants;
