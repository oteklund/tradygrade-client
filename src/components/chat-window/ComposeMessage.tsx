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

  useEffect(() => {
      setUserField(props.chatDetails.user2);
  }, [props.chatDetails]);

  const typingMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageField(e.target.value);
    // socket.emit('typing', userField, chatIDField);
  };

  return (
    <div className="ComposeMessage">
      <textarea
        id="message"
        placeholder="Message"
        value={messageField}
        onChange={typingMessage}
      ></textarea>
      <button>Send</button>
    </div>
  );
};

export default ComposeMessage;
