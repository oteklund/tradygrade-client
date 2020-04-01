/*
This component contains the fields in which the user writes a message and submits the message.
*/
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import icon from '../chat-window/icon.png'
import { ChatMessage } from '../chat-window/types';
import { getMessageHistory, addNewMessage } from '../../services/chat';

// import io from 'socket.io-client';
// const socket = io("http://localhost:9000")

interface Props {
    user: string;
    userID: number;
    chatID: number;
}


const ChatTesting = (props: Props) => {
    const [messageField, setMessageField] = useState<string>("");
    const [userField, setUserField] = useState<string>(props.user);
    const [userId, setUserId] = useState<number>(props.userID)
    const [userPicture, setUserPicture] = useState<any>(icon)
    const [chatIDField, setChatIDField] = useState<number>(props.chatID);
    const [messageHistory, setMessageHistory] = useState<ChatMessage[]>([]);

    const timeStamp = new Date()
    let position: string;

    async function getHistory() {
        const history = await getMessageHistory(chatIDField)
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
            
            const element: HTMLElement = document.getElementById('output') as HTMLElement
            element.innerHTML += `<p style=${position}><img src=${userPicture} height="20em" buffer)/> <b>${message.username}: </b>${message.message} <i id="timeStamp">${moment(message.timestamp).format('h:mm:ss')}</i></p>`
            
            const chatWindow: HTMLElement = document.getElementById('chatWindow') as HTMLElement
            chatWindow.scrollTop = element.scrollHeight;
        }
    }
    useEffect(() => {
        getHistory()

        // // socket
        // socket

        //     // Join chat
        //     .emit('joinChat', userField, chatIDField)

        //     //send welcome message
        //     .on('message', (message: string) => {
        //         console.log(message)
        //     })

        //     .on('user online', (message: string) => {
        //         console.log(message)
        //     })

        //     .on('typing', (user: string) => {
        //         const feedback: HTMLElement = document.getElementById('feedback') as HTMLElement
        //         feedback.innerHTML = `<p><em>${user} is typing a message...</em></p>`
        //     })

        //     .on('new message', (message: ChatMessage) => {
        //         setMessageHistory(messageHistory => [...messageHistory, {
        //             chat: message.chat,
        //             user: message.user,
        //             picture: message.picture,
        //             message: message.message,
        //             time: message.time
        //         }])
        //         message.user !== userField ? position = 'text-align:left' : position = 'text-align:right'
                
        //         const element: HTMLElement = document.getElementById('output') as HTMLElement
        //         element.innerHTML += `<p style=${position}><img src=${userPicture} height="20em" buffer)/> <b>${message.user}: </b>${message.message} <i id="timeStamp">${moment(message.time).format('h:mm:ss')}</i></p>`
                
        //         const chatWindow: HTMLElement = document.getElementById('chatWindow') as HTMLElement
        //         chatWindow.scrollTop = element.scrollHeight;
               
        //         const feedback: HTMLElement = document.getElementById('feedback') as HTMLElement
        //         feedback.innerHTML = ``
        //         setMessageField('');
        //     })

        //     .on('user disconnect', (message: string) => {
        //         console.log(message)
        //     })
        // return () => {
        //     socket.off('disconnet');
        // };
    }, [])



    // Sending an message
    const sendMessage = () => {
        //Emmiting a chat message to server 
        // socket.emit('chatMessage', {
        //     chat: chatIDField,
        //     user: userField,
        //     picture: userPicture,
        //     message: messageField,
        //     time: timeStamp
        // });
        // addNewMessage(chatIDField, {            
        //     user: userId,
        //     message: messageField,
        //     time: timeStamp
        // })
    }

    const typingMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessageField(e.target.value)
        // socket.emit('typing', userField, chatIDField);
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
                {/* <input id="chatID" type="text" placeholder="chatID" value={chatIDField} onChange={e => setChatIDField(parseInt(e.target.value))} /> */}
                <input id="message" type="text" placeholder="Message" value={messageField} onChange={typingMessage} />
                <button id="send" onClick={() => sendMessage()}>Send</button>
            </div>
        </div>
    )
}

export default ChatTesting
