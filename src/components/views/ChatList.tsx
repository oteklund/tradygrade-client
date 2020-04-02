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
import renderIcon from "../../pictures/renderingChat.gif";
import picture from "../../pictures/tradygradedarkblue.png";
import { render } from "react-dom";

interface Props {
  user: User;
  history: History<LocationState>;
  users: User[];
}

const ChatList = (props: Props) => {
  const [chatList, setChatList] = useState<Array<any>>([]);
  const [userList, setUserList] = useState<User[]>([]);
  const [filteredUserList, setFilteredUserList] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<number>();
  const [renderingYes, setRenderingYes] = useState<boolean>(true);

  const filterUserList = (myChatList: any[]) => {
    let userArray: any[] = props.users.map(user => ({
      name: user.name,
      id: user.id
    }));
    let targetArray: any[] = myChatList.map(user => ({
      name: user.name,
      id: user.chatid
    }));

    console.log(userArray)
    console.log(targetArray)
  };

  const myLists = async () => {
    let myChatList = await getChats(props.user.id);
    await setChatList(myChatList);
    await setUserList(props.users);
    setRenderingYes(false);
    filterUserList(myChatList);
  };

  useEffect(() => {
    myLists();
  }, [props.user]);

  const createChat = async () => {
    let newChatID;
    try {
      newChatID = await newChat({
        user1: props.user.id,
        user2: selectedUser
      });
    } catch (err) {
      throw err;
    }
    history.push(`/chat/${newChatID.id}/${newChatID.name}`);
  };

  return (
    <div className="MyChatWindow">
      <div className="MyChats">
        <h3>My Chats</h3>
        <div>
          <select
            className="select-chat-user"
            name="users"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedUser(parseInt(e.target.value))
            }
          >
            <option placeholder="Select user..." value="" color="white">
              Select user...
            </option>
            {userList.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button className="MyChatButton" onClick={() => createChat()}>
            Start a new conversation
          </button>
          {renderingYes ? (
            <img src={renderIcon} height="50em" />
          ) : chatList === undefined ? (
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
                onClick={() =>
                  history.push(`/chat/${chat.chatid}/${chat.name}`)
                }
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
      <div className="chatEdge">
        <div className="MyChatOutput">
          <img className="trady-image" src={picture} alt="tradygradedarkblue" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  users: state.users
});

export default connect(mapStateToProps)(ChatList);
