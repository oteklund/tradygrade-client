export interface ChatMessage {
    chat: number;
    message: string;
    picture: any;
    user: string;
    time: Date;
}

export interface ChatUser {
    id: number;
    user: string;
    picture: any;
}
