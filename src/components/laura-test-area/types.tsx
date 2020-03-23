export interface ChatMessage {
    user: string;
    message: string;
}

export interface ChatState {
    input: string;
    messages: ChatMessage[];
}