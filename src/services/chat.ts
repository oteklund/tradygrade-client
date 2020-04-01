import axios from 'axios';

// GET message history from DB. Simple way for testing
const MessageUrl = 'http://localhost:4000/api/chat/message';

export const getMessageHistory = async (chatID: number) => {
    const response = await axios.get(`${MessageUrl}s/${chatID}`);
    if (response.status === 200) {
        return (response.data)
    } else {
        console.log('Did not get the message history!');
    }
}

export const addNewMessage = async (chatID: number, body: object) => {
    const response = await axios.post(`${MessageUrl}s/${chatID}`, body);
    if (response.status === 200) {
        return (response.data)
    } else {
        console.log('Did not get the message history!');
    }
}

// GET chatID by two userIDs
const ChatUrl = "http://localhost:4000/api/chat"

export const getChatID = async (user1:number, user2:number) => {
    const response = await axios.get(`${ChatUrl}/our/${user1}/${user2}`);
    if (response.status === 200  && response.data.length !== 0) {
        return (response.data[0].chat_id)
    } else {
        console.log('Did not find chatID for these users!');
    }
}

export const getChats = async (userid?:number ) => {
    const response = await axios.get(`${ChatUrl}/my/${userid}`);
    if (response.status === 200  && response.data.length !== 0) {
        return (response.data)
    } else {
        console.log('Did not find chatID for these users!');
    }
}

export const newChat = async (userids:object) => {
    const response = await axios.post(`${ChatUrl}/new`, {userids});
    if (response.status === 200  && response.data.length !== 0) {
        return (response.data)
    } else {
        console.log('Could not create new chat!');
    }
}

// Temporary user fetch
const UsersUrl = "http://localhost:4000/api/users"

export const getUsers = async () => {
    const response = await axios.get(`${UsersUrl}`);
    if (response.status === 200) {
        return (response.data)
    } else {
        console.log('Did not find users!');
    }
}
