/*
This component displays previously sent and received chats.
*/
import React, { useState, useEffect } from "react";
import moment from "moment";
import { getMessageHistory } from "../../services/chat";
import { ChatMessage } from "./types";
import icon from "./icon.png";

interface Props {
  chatID: number;
  myUserId: number;
  myPicture: string;
  myName: string;
  newMessage: any;
  typingInfo: any;
}

const ChatOutput = (props: Props) => {
  const [messageHistory, setMessageHistory] = useState<ChatMessage[]>([]);
  const [newMessages, setNewMessages] = useState<ChatMessage>(props.newMessage);
  const [typingMessages, setTypingMessages] = useState<ChatMessage>(
    props.typingInfo
  );
  const [chatIDField, setChatIDField] = useState<number>(props.chatID);
  const [userField, setUserField] = useState<string>(props.myName);

  let position: string = 'left';

  async function getHistory() {
    const history = await getMessageHistory(props.chatID);
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
      message.username !== userField
        ? (position = "text-align:left")
        : (position = "text-align:right");
      let element: HTMLElement = document.getElementById(
        "output"
      ) as HTMLElement;
      element.innerHTML += `<p style=${position}><img src=${message.picture ||
        icon} height="20em" buffer)/> <b>${message.username}: </b>${
        message.message
      } <i id="timeStamp">${moment(message.time).format("h:mm:ss")}</i></p>`;
      let chatWindow: HTMLElement = document.getElementById(
        "chatWindow"
      ) as HTMLElement;
      chatWindow.scrollTop = element.scrollHeight;
    }
  }

  const addOutput = (message: any) => {};

  useEffect(() => {
    setMessageHistory([]);
    const element: HTMLElement = document.getElementById(
      "output"
    ) as HTMLElement;
    element.innerHTML = "";
    setChatIDField(props.chatID);
    setUserField(props.myName);
    getHistory();
  }, []);

  useEffect(() => {
    setNewMessages(newMessages => props.newMessage);
    addNewRow();
  }, [props.newMessage]);

  useEffect(() => {
    setTypingMessages(typingMessages => props.typingInfo);
    someoneIsTyping(props.typingInfo);
  }, [props.typingInfo]);

  const addNewRow = async () => {
    let feedback: HTMLElement = document.getElementById(
      "feedback"
    ) as HTMLElement;
    feedback.innerHTML = ''
    let message = await props.newMessage;
    if (message === undefined) {
      console.log("fail: no new messages");
    } else {
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
    }
  };

  const someoneIsTyping = (typer:string) => {
    let feedback: HTMLElement = document.getElementById(
      "feedback"
    ) as HTMLElement;
    if (props.typingInfo !== undefined) {
      feedback.innerHTML = `<p><em>${typer} is typing a message...</em></p>`;
    }
  };

  return (
    <div className="ChatOutput">
      <div id="chatWindow">
        <ul id="output"></ul>
        <div id="feedback"></div>
      </div>
    </div>
  );
};

export default ChatOutput;
