export type ChatData = {
    id: string,
    name: string,
    icon: string,

    // Used when starting a direct message
    receiverId?: string
}

export enum ChatDomain {
    COURSE_DISCUSSION,
    DIRECT_MESSAGE
};

export type MessengerChat = {
    domain: ChatDomain,
    data: ChatData
}