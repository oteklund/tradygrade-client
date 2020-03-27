/*
This component displays the participant names and pictures in the chat window.
*/
import React, { useState, useEffect } from 'react';
import ChatTesting from './ChatTesting';

interface Props {

}
let chat = <h1>Hello</h1>;


const SelectChat = (props: Props) => {
    const [chatID, setChatId] = useState<number>(0)
    const [user, setUser] = useState<string>('')

    let changeID = (e: any) => {
        setChatId(e.target.value)
        chat = <ChatTesting chatID={e.target.value} user={user} />
    }

    return (
        <div>
             <input id="user" type="text" placeholder="User" value={user} onChange={e => setUser(e.target.value)} />
            <button value='1' onClick={changeID}>1</button>
            <button value='2' onClick={changeID}>2</button>
            <button value='3' onClick={changeID}>3</button>
            <button value='4' onClick={changeID}>4</button>
            {/* <input value={chatID} onChange={changeID}></input> */}
            {chat}
        </div>
    )
}

export default SelectChat