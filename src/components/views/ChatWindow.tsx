/*
This component is the container for all chat functionality: composing and sending messages, reading earlier chats and displaying participants.
*/
import React from 'react';
import '../chat-window/chat.scss'
import ChatOutput from '../chat-window/ChatOutput';
import ChatParticipants from '../chat-window/ChatParticipants';
import ComposeMessage from '../chat-window/ComposeMessage';

interface Props {

}

const ChatWindow = (props: Props) => {
    return (
        <div className="ChatWindow">
            < ChatParticipants />
            < ChatOutput />
            < ComposeMessage />
        </div>
    )
}

export default ChatWindow
