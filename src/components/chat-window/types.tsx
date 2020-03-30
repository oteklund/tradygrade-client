export interface ChatMessage {
    chat: number;
    user: string;
    picture: any;
    message: string;
    time: Date;
}

export interface ChatUser {
    id: number;
    user: string;
    picture: any;
}
