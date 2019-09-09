import { AccountField } from '../../shared/verification/user';

export type ActiveUser = {
    username: AccountField,
    socketId: string
}

export type GroupChatMasterList = {
    [room: string] : UserStatus[]
}

export enum Status {
    ONLINE,
    OFFLINE
}

export type UserStatus = {
    username: string,
    status: Status
}
