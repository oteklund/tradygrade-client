/*
This component displays previously sent and received chats.
*/
import React, { useState, useEffect } from "react";
import moment from "moment";
import { getMessageHistory } from "../../services/chat";
import { ChatMessage } from "./types";
import icon from "./icon.png";

import io from "socket.io-client";
import UserDetails from "../account-management/UserDetails";
const socket = io("http://localhost:9000");

interface Props {
  chatDetails: any;
  myUserId: number;
  myName: string;
  newMessage: any;
}

const ChatOutput = (props: Props) => {
  const [messageHistory, setMessageHistory] = useState<ChatMessage[]>([]);
  const [newMessages, setNewMessages] = useState<ChatMessage>(props.newMessage);
  const [chatIDField, setChatIDField] = useState<number>(props.myUserId);
  const [userField, setUserField] = useState<string>(props.myName);
  const [userPicture, setUserPicture] = useState<any>(
    props.chatDetails.picture
  );

  let position: string;
  async function getHistory() {
    const element: HTMLElement = document.getElementById(
      "output"
    ) as HTMLElement;
    const history = await getMessageHistory(props.chatDetails.id);
    for (let message of history.messages) {
      setMessageHistory(messageHistory => [
        ...messageHistory,
        {
          chat: history.chatID,
          user: message.username,
          picture: message.picture,
          message: message.message,
          time: message.timestamp
        }
      ]);
      const element: HTMLElement = document.getElementById(
        "output"
      ) as HTMLElement;
      message.username !== userField
        ? (position = "text-align:left")
        : (position = "text-align:right");
  
      element.innerHTML += `<p style=${position}><img src=${message.picture ||
        icon} height="20em" buffer)/> <b>${message.username}: </b>${
        message.message
      } <i id="timeStamp">${moment(message.time).format("h:mm:ss")}</i></p>`;
  
      const chatWindow: HTMLElement = document.getElementById(
        "chatWindow"
      ) as HTMLElement;
      chatWindow.scrollTop = element.scrollHeight;
    }
  }

  const addOutput = (message: any) => {
    
  };

  useEffect(() => {
    setMessageHistory([]);
    const element: HTMLElement = document.getElementById(
      "output"
    ) as HTMLElement;
    element.innerHTML = "";
    setUserField(props.myName);
    setChatIDField(props.chatDetails.id);
    setUserPicture(props.chatDetails.picture);
    getHistory();
  }, [props.chatDetails]);

  const addNewRow = async () => {
    let message = await props.newMessage;
    if (message == undefined ) {console.log('fail')} else {
    const element: HTMLElement = document.getElementById(
        "output"
      ) as HTMLElement;
      message.user !== userField
        ? (position = "text-align:left")
        : (position = "text-align:right");
  
      element.innerHTML += `<p style=${position}><img src=${message.picture ||
        icon} height="20em" buffer)/> <b>${message.user}: </b>${
        message.message
      } <i id="timeStamp">${moment(message.time).format("h:mm:ss")}</i></p>`;
  
      const chatWindow: HTMLElement = document.getElementById(
        "chatWindow"
      ) as HTMLElement;
      chatWindow.scrollTop = element.scrollHeight;
    }};

  useEffect(() => {
    setNewMessages(newMessages => props.newMessage);
    addNewRow();
  }, [props.newMessage]);

  return (
    <div className="ChatOutput">
      <h3>ChatOutput</h3>
      <div id="chatWindow">
        <ul id="output"></ul>
      </div>
    </div>
  );
};

export default ChatOutput;
