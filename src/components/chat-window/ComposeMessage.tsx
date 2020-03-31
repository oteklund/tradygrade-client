/*
This component allows the user to write and send chat messages.
*/
import React, { useState, useEffect } from "react";
import moment from "moment";
import { ChatMessage } from "./types";
import { addNewMessage } from "../../services/chat";

interface Props {
  chatID: number;
  myUserId: number;
  myName: string;
  myPicture: string;
  emitMessage: any;
  typingMessage: any;
}

const ComposeMessage = (props: Props) => {
  const [messageField, setMessageField] = useState<string>("");
  const [userField, setUserField] = useState<string>(props.myName);
  const [userPicture, setUserPicture] = useState<any>(props.myPicture);
  const [chatID, setChatID] = useState<number>(props.chatID);

  const timeStamp = new Date();

  useEffect(() => {
    setChatID(props.chatID);
    setUserField(props.myName);
    setUserPicture(props.myPicture);
  }, [props.chatID]);

  // Sending an message
  const sendMessage = () => {
    props.emitMessage({
      chat: chatID,
      user: userField,
      picture: userPicture,
      message: messageField,
      time: timeStamp
    });
    addNewMessage(props.chatID, {
      user: props.myUserId,
      message: messageField,
      time: timeStamp
    });
    setMessageField("");
  };

  const typingMessage = (e: any) => {
    setMessageField(e.target.value);
    props.typingMessage(userField, chatID);
  };

  return (
    <div className="ComposeMessage">
      <textarea
        id="message"
        placeholder="Message"
        value={messageField}
        onChange={typingMessage}
      ></textarea>
      <br></br>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ComposeMessage;
