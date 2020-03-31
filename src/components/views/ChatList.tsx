/*
This component is for listing all previously opnened chats.
*/
import "../chat-window/chat.scss";
import React, { useEffect, useState, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { History, LocationState } from "history";

import { getChats, newChat } from "../../services/chat";
import { User } from "../../models/types";
import history from "../../history";
import icon from "../../pictures/tradyheadorange.png";
import picture from "../../pictures/tradygradedarkblue.png";
import { render } from "@testing-library/react";
import { renderIntoDocument } from "react-dom/test-utils";

interface Props {
  user: any;
  history: History<LocationState>;
  users: User[];
}

const ChatList = (props: Props) => {
  const [chatList, setChatList] = useState<any[]>([]);
  const [userList, setUserList] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>();

  const myLists = async () => {
    let chatList = await getChats(props.user.id);
    setChatList(chatList);
    setUserList(props.users);
  };

  useEffect(() => {
    myLists();
  }, [props.user]);

  const createChat = async () => {
    let newChatID = await newChat({
      user1: props.user.id,
      user2: selectedUser
    });
    history.push(`/chat/${newChatID}`)
  };

  return (
    <div className="MyChatWindow">
      <div className="MyChats">
        <h3>MyChats</h3>
        <div>
          <select
            name="users"
            onChange={(e: any) => setSelectedUser(parseInt(e.target.value))}
          >
            <option value=""></option>
            {userList.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
          <button onClick={() => createChat()}>Start a new conversation</button>
          {chatList === undefined ? (
            <div className="ChatBlock">
              <div id="noChats">
                <p>
                  First time chatting? <br />
                  <br /> No worries just search for a person and start a new
                  conversation!
                </p>
                <img src={icon} height="50em" />
              </div>
            </div>
          ) : (
            chatList.map(chat => (
              <div
                key={chat.chatid}
                style={{ textDecoration: "none" }}
                onClick={() => history.push(`/chat/${chat.chatid}`)}
              >
                <div className="ChatBlock">
                  <div id="userDiv">
                    <img src={chat.picture || icon} height="20em" />
                    <b> {chat.name} </b>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="MyChatOutput">
        <img src={picture} alt="tradygradedarkblue" />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  users: state.users
});

export default connect(mapStateToProps)(ChatList);
