/*
This component displays the participant names and pictures in the chat window.
*/
import React, { useEffect, useState } from "react";
import { ChatUser } from "./types";
import history from "../../history";
import icon from "./icon.png";

interface Props {
  
}

const MyChats = (props: Props) => {
  const [chatList, setChatList] = useState<any[]>([]);

  useEffect(() => {
    console.log('Tänne tarvitaan vielä vastustajan nimi ja kuva')
  },);

  return (
    <div className="Chats">
      <h3>MyChats</h3>
      <div>
          <button onClick={() => history.push(`/chat`)}>Go back to chat list</button>
          <p>You are currently chatting with:</p>
          <i>Other persons name</i>
          <br/>
          <img src={icon}/>
          <p>Maybe also items from this person?</p>
          <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          </ul>
          <p>Or raiting of this fellow?</p>
      </div>
    </div>
  );
};

export default MyChats;
