/*
This component is for listing all previously opnened chats.
*/
import "../chat-window/chat.scss";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Router, Route, Link } from "react-router-dom";
import history from "../../history";
import ChatWindow from "./ChatWindow";
import { getChats } from "../../services/chat";
import icon from "../../pictures/tradyheadorange.png";
import picture from "../../pictures/tradygradedarkblue.png";

interface Props {
  user: any;
}

const ChatList = (props: Props) => {
  const [chatList, setChatList] = useState<any[]>([]);

  const myChats = async () => {
    let chatList = await getChats(props.user.id);
    setChatList(chatList);
    console.log(chatList)
  };

  useEffect(() => {
    myChats();
  }, [props.user]);

  return (
    <div className="MyChatWindow">
      <div className="MyChats">
        <h3>MyChats</h3>
        <div>
          <button>Start new conversation</button>
          {chatList.map(chat => (
            <div
              style={{ textDecoration: "none" }}
              onClick={() => history.push(`/chat/${chat.chatid}`)}
            >
              <div className="ChatBlock" key={chat.chatid}>
                <div id="userDiv" onClick={() => console.log(chat)}>
                  <img src={chat.picture || icon} height="20em" />
                  <b> {chat.name} </b>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="MyChatOutput">
        <img src={picture} alt="tradygradedarkblue" />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(ChatList);
