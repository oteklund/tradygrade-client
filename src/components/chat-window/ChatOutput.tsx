/*
This component displays previously sent and received chats.
*/
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { getMessageHistory } from "../../services/chat";
import { ChatMessage } from '../laura-test-area/types';
import icon from './icon.png'

import io from 'socket.io-client';
const socket = io("http://localhost:9000")

interface Props {
    chatDetails: any;
}

const ChatOutput = (props: Props) => {
    const [messageHistory, setMessageHistory] = useState<ChatMessage[]>([]);
    const [chatIDField, setChatIDField] = useState<number>(props.chatDetails.id);
    const [userField, setUserField] = useState<string>(props.chatDetails.myId);
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
        setUserField(props.chatDetails.myId)
        setChatIDField(props.chatDetails.id)
        getHistory()
    }, [props.chatDetails])

    useEffect(() => {
        getHistory()

        // socket
        socket

            // Join chat
            .emit('joinChat', userField, chatIDField)

            //send welcome message
            .on('message', (message: string) => {
                console.log(message)
            })

            .on('user online', (message: string) => {
                console.log(message)
            })

            .on('new message', (message: ChatMessage) => {
                setMessageHistory(messageHistory => [...messageHistory, {
                    chat: message.chat,
                    user: message.user,
                    picture: message.picture,
                    message: message.message,
                    time: message.time
                }])
                message.user !== userField ? position = 'text-align:left' : position = 'text-align:right'
                
                const element: HTMLElement = document.getElementById('output') as HTMLElement
                element.innerHTML += `<p style=${position}><img src=${userPicture} height="20em" buffer)/> <b>${message.user}: </b>${message.message} <i id="timeStamp">${moment(message.time).format('h:mm:ss')}</i></p>`
                
                const chatWindow: HTMLElement = document.getElementById('chatWindow') as HTMLElement
                chatWindow.scrollTop = element.scrollHeight;
               
                const feedback: HTMLElement = document.getElementById('feedback') as HTMLElement
                feedback.innerHTML = ``
            })

            .on('user disconnect', (message: string) => {
                console.log(message)
            })
        return () => {
            socket.off('disconnet');
        };
    }, [])


    return (
        <div className="ChatOutput">
            <h3>ChatOutput</h3>
            <div id="chatWindow">
                    <ul id="output"></ul>
            </div>
        </div>
    )
}

export default ChatOutput
