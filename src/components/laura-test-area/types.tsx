export interface ChatMessage {
    chat: number;
    message: string;
    user: string;
    time: Date;
}

export interface ChatState {
    input: string;
    messages: ChatMessage[];
}

export interface Messages {
    messages: ChatMessage[];
}

// chat: chatID, 
// user: userField,
// message: messageField,
// time: timeStamp