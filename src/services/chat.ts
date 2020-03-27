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
