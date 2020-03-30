/*
This component displays the participant names and pictures in the chat window.
*/
import React, { useEffect, useState } from "react";
import { ChatUser } from "./types";
import history from "../../history";
import icon from "./icon.png";

interface Props {
  chats: any;
}

const MyChats = (props: Props) => {
  const [chatList, setChatList] = useState<any[]>([]);

  const MyChatList = () => {
    for (let chat of props.chats) {
      setChatList(chatList => [
        ...chatList,
        { id: chat.chatid, name: chat.name, picture: chat.picture }
      ]);
    }
  };

  useEffect(() => {
    MyChatList();
  }, [props.chats]);

  const openChat = (chat:any) => {
    console.log(chat)
  }

  return (
    <div className="Chats">
      <h3>MyChats</h3>
      <div>
          <button onClick={() => history.push(`/chat/`)}>Go back to chat list</button>
          <p>Other persons name</p>
          <p>Maybe also items from this person?</p>
        {/* {chatList.map(chat => (
          <div className="ChatBlock" key={chat.chatid}>
            <div id="userDiv" onClick={() => openChat(chat)}>
              <img src={chat.picture || icon} height="20em" />
              <b> {chat.name} </b>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default MyChats;
