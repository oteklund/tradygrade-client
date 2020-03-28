/*
This component allows the user to write and send chat messages.
*/
import React, { useState, useEffect } from "react";
import moment from "moment";
import { ChatMessage } from "../laura-test-area/types";
import { getMessageHistory, addNewMessage } from "../../services/chat";

import io from "socket.io-client";
const socket = io("http://localhost:9000");

interface Props {
  chatDetails: any;
  // message: String
}

const ComposeMessage = (props: Props) => {
  const [messageField, setMessageField] = useState<string>("");
  const [userField, setUserField] = useState<string>("");
  const [userPicture, setUserPicture] = useState<any>("");
  const [chatID, setChatID] = useState<number>(0);

  const timeStamp = new Date();

  useEffect(() => {
    setUserField(props.chatDetails.myName);
    setChatID(props.chatDetails.id);
    setUserPicture(props.chatDetails.picture);

    socket
      // Join chat
      .emit("joinChat", userField, chatID)
      
      .on('typing', (user: string) => {
        const feedback: HTMLElement = document.getElementById('feedback') as HTMLElement
        feedback.innerHTML = `<p><em>${user} is typing a message...</em></p>`
    })
  }, [props.chatDetails]);

  // Sending an message
  const sendMessage = () => {
    //Emmiting a chat message to server
    socket.emit("chatMessage", {
      chat: chatID,
      user: userField,
      picture: userPicture,
      message: messageField,
      time: timeStamp
    });
    // addNewMessage(chatIDField, {
    //   user: userId,
    //   message: messageField,
    //   time: timeStamp
    // });
    setMessageField("");
  };

  const typingMessage = (e: any) => {
    setMessageField(e.target.value);
    socket.emit("typing", userField, chatID);
  };

  return (
    <div className="ComposeMessage">
      <div id="feedback"></div>
      <textarea
        id="message"
        placeholder="Message"
        value={messageField}
        onChange={typingMessage}
      ></textarea>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ComposeMessage;
