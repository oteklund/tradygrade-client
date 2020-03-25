/*
This component contains the fields in which the user writes a message and submits the message.
*/
import './styles.scss';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { ChatMessage } from './types';

import io from 'socket.io-client';
import { stringify } from 'querystring';
const socket = io("http://localhost:9000")

interface Props {

}


const ChatTesting = (props: Props) => {
    const [messageField, setMessageField] = useState<string>("");
    const [userField, setUserField] = useState<string>("Mauri");
    const [messageHistory, setMessageHistory] = useState<ChatMessage[]>([]);

    const timeStamp = new Date()
    const chatID = 1345

    useEffect(() => {
        socket
            .emit('joinChat', userField, chatID)
            // .on('join', (message: string) => {
            //     console.log(message)
            // })

            .on('user online', (message: string) => {
                console.log(message)
            })

            .on('typing', (user: string) => {
                const feedback: HTMLElement = document.getElementById('feedback') as HTMLElement
                feedback.innerHTML = `<p><em>${user} is typing a message...</em></p>`
            })

            .on('new message', (message: ChatMessage) => {
                setMessageHistory(messageHistory => [...messageHistory, {
                    chat: message.chat,
                    user: message.user,
                    message: message.message,
                    time: message.time
                }])
                const element: HTMLElement = document.getElementById('output') as HTMLElement
                element.innerHTML += `<li><i id="timeStamp">${moment(message.time).format('h:mm:ss')}</i> <b>${message.user}: </b>${message.message}</li>`
                const chatWindow: HTMLElement = document.getElementById('chatWindow') as HTMLElement
                chatWindow.scrollTop = element.scrollHeight;
                const feedback: HTMLElement = document.getElementById('feedback') as HTMLElement
                feedback.innerHTML = ``
                setMessageField('');
                setUserField('');
            })

            .on('user disconnect', (message: string) => {
                console.log(message)
            })
        return () => {
            socket.off('disconnet');
        };
    }, [setMessageHistory])



    // Sending an message
    const sendMessage = () => {
        //Emmiting a chat message to server 
        socket.emit('chatMessage', {
            chat: chatID,
            user: userField,
            message: messageField,
            time: timeStamp
        });
    }

    const typingMessage = (e: any) => {
        setMessageField(e.target.value)
        socket.emit('typing', userField, chatID);
    }

    return (
        <div>
            <h1>Testing the chat</h1>
            <div id="myChat">
                <h3>Chat</h3>
                <div id="chatWindow">
                    <div id="feedback"></div>
                    <ul id="output"></ul>
                </div>
                <input id="user" type="text" placeholder="User" value={userField} onChange={e => setUserField(e.target.value)} />
                <input id="message" type="text" placeholder="Message" value={messageField} onChange={typingMessage} />
                <button id="send" onClick={() => sendMessage()}>Send</button>
            </div>
        </div>
    )
}

export default ChatTesting
