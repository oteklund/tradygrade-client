/*
This component displays one chat user.
*/
import React, { useEffect, useState } from "react";
import icon from "./icon.png";
import { ChatUser } from "../chat-window/types";
import { getChatID } from "../../services/chat";


interface Props {
  chatUser: ChatUser;
  selectedChat: any;
}

const ChatBlock = (props: Props) => {
  const [myId, setMyId] = useState<number>(2);
  const [myName, setMyName] = useState<string>('John Doe')
  const [user2, setUser2] = useState<number>(props.chatUser.id);

//   const getChatId = async () => {};

  const openChat = async () => {
      let chatID = await getChatID(myId, user2);
      props.selectedChat({ id: chatID, myId: myId, myName: myName, user2: props.chatUser.id, user2name: props.chatUser.user, picture: props.chatUser.picture});
  };

  return (
    <div className="ChatBlock" key={props.chatUser.id}>
      <div id="userDiv" onClick={openChat}>
        <img src={props.chatUser.picture || icon} height="20em" />
        <b> {props.chatUser.user} </b>
      </div>
    </div>
  );
};

export default ChatBlock;
