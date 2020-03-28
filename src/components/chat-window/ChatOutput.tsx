/*
This component displays previously sent and received chats.
*/
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { getMessageHistory } from "../../services/chat";
import { ChatMessage } from '../laura-test-area/types';
import icon from './icon.png'
import { render } from '@testing-library/react';


interface Props {
    chatDetails: any;
}

const ChatOutput = (props: Props) => {
    const [messageHistory, setMessageHistory] = useState<ChatMessage[]>([]);
    const [chatIDField, setChatIDField] = useState<number>(props.chatDetails.id);
    const [userField, setUserField] = useState<string>(props.chatDetails.me);
    const [userPicture, setUserPicture] = useState<any>(icon)

    let position: string;
    async function getHistory() {
        const element: HTMLElement = document.getElementById('output') as HTMLElement
        element.innerHTML = ''; 
        const history = await getMessageHistory(props.chatDetails.id)
        console.log(history)
        for (let message of history.messages) {
            console.log(message)
            setMessageHistory(messageHistory => [...messageHistory, {
                chat: history.chatID,
                user: message.username,
                picture: message.picture,
                message: message.message,
                time: message.timestamp
            }])
            message.username !== userField ? position = 'text-align:left' : position = 'text-align:right'
            
            element.innerHTML += `<p style=${position}><img src=${userPicture} height="20em" buffer)/> <b>${message.username}: </b>${message.message} <i id="timeStamp">${moment(message.timestamp).format('h:mm:ss')}</i></p>`
            
            const chatWindow: HTMLElement = document.getElementById('chatWindow') as HTMLElement
            chatWindow.scrollTop = element.scrollHeight;
        }
    }

    useEffect(() => {
        setUserField(props.chatDetails.me)
        setChatIDField(props.chatDetails.id)
        getHistory()
    }, [props.chatDetails])

    return (
        <div className="ChatOutput">
            <h3>ChatOutput</h3>
            <div id="chatWindow">
                    <ul id="output"></ul>
                    <div id="feedback"></div>
            </div>
        </div>
    )
}

export default ChatOutput
