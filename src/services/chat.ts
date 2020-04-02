import axios from 'axios';
import {tokenAndHeaderConfig} from "./util"

// GET message history from DB. Simple way for testing
const MessageUrl = 'http://localhost:4000/api/chat/message';

export const getMessageHistory = async (chatID: number) => {
  let headers = await tokenAndHeaderConfig()
  const response = await axios.get(`${MessageUrl}s/${chatID}`, {headers: headers});
  if (response.status === 200) {
    return response.data;
  } else {
    console.log('Did not get the message history!');
  }
};

export const addNewMessage = async (chatID: number, body: object) => {
  let headers = await tokenAndHeaderConfig()
  const response = await axios.post(`${MessageUrl}s/${chatID}`, body, {headers});
  if (response.status === 200) {
    return response.data;
  } else {
    console.log('Did not get the message history!');
  }
};

// GET chatID by two userIDs
const ChatUrl = 'http://localhost:4000/api/chat';

export const getChatID = async (user1: number, user2: number) => {
  let headers = await tokenAndHeaderConfig()
  const response = await axios.get(`${ChatUrl}/our/${user1}/${user2}`, {headers});
  if (response.status === 200 && response.data.length !== 0) {
    return response.data[0].chat_id;
  } else {
    return null;
  }
};

export const getChats = async (userid?: number) => {
  let headers = await tokenAndHeaderConfig()
  const response = await axios.get(`${ChatUrl}/my/${userid}`, {headers});
  if (response.status === 200 && response.data.length !== 0) {
    return response.data;
  } else {
    console.log('Did not find chatID for these users!');
  }
};

export const newChat = async (userids: object) => {
  let headers = await tokenAndHeaderConfig()
  const response = await axios.post(`${ChatUrl}/new`, { userids, headers });
  if (response.status === 200 && response.data.length !== 0) {
    return response.data;
  } else {
    console.log('Could not create new chat!');
  }
};

// Temporary user fetch
const UsersUrl = 'http://localhost:4000/api/users';

export const getUsers = async () => {
  let headers = await tokenAndHeaderConfig()
  const response = await axios.get(`${UsersUrl}`, {headers});
  if (response.status === 200) {
    return response.data;
  } else {
    console.log('Did not find users!');
  }
};
