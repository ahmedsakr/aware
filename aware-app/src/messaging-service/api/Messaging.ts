import { AccountField } from '../../shared/verification/user';

export type ActiveUser = {
    username: AccountField,
    socketId: string
}

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

export type GroupChatMasterList = {
    [room: string] : UserStatus[]
}

export type MessengerChat = {
    domain: ChatDomain,
    data: ChatData
}

export enum Status {
    ONLINE,
    OFFLINE
}

export type UserStatus = {
    username: string,
    status: Status
}