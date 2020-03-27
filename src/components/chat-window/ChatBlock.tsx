/*
This component displays one chat user.
*/
import React from 'react';
import icon from '../laura-test-area/icon.png';
import { ChatUser } from "../laura-test-area/types";


interface Props {
    chatUser:ChatUser
}


const ChatBlock = (props: Props) => {
    const openChat = () => {
        console.log(props.chatUser.user)
    }
    
    return (
        <div className="ChatBlock">
            <div  id="userDiv" onClick={openChat}><img src={props.chatUser.picture || icon} height="20em"/><b> {props.chatUser.user} </b></div>
        </div>
    )
}

export default ChatBlock
