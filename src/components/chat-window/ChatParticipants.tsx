/*
This component displays the participant names and pictures in the chat window.
*/
import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/chat";
import { ChatUser } from "../laura-test-area/types";
import ChatBlock from "./ChatBlock";

interface Props {}

const ChatParticipants = (props: Props) => {
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);

  const allUsers = async () => {
    let users = await getUsers();
    for (let user of users) {
      setChatUsers(chatUsers => [
        ...chatUsers,
        {
          id: user.id,
          user: user.name,
          picture: user.picture
        }
      ]);
    }
  };

  useEffect(() => {
    allUsers();
  }, []);

  return (
    <div className="ChatParticipants">
      <h3>ChatParticipants</h3>
      <div id="userList">
        {chatUsers.map(chatUser => < ChatBlock chatUser={chatUser} key={chatUser.id}/>)}
      </div>
    </div>
  );
};


export default ChatParticipants;