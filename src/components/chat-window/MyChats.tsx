/*
This component displays the participant names and pictures in the chat window.
*/
import React, { useEffect, useState } from "react";
import { User } from "../../models/types";
import history from "../../history";
import icon from "../../pictures/tradyheadorange.png";

interface Props {
  otherUserName: string;
  otherUserPicture: string;
}

const MyChats = (props: Props) => {

  return (
    <div className="Chats">
      <h3>MyChats</h3>
      <div>
          <button className="MyChatButton" onClick={() => history.push(`/chat`)}>Go back to chat list</button>
          <p>You are currently chatting with:<i>{props.otherUserName}</i></p>
          <img src={props.otherUserPicture || icon} height="100rem"/>
          <p><b>{props.otherUserName}</b> seems like a good tradyuser!</p>

      </div>
    </div>
  );
};

export default MyChats;
