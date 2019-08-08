import awaredb from '../../shared/database/awaredb'

export type GroupChat = {
    group_id: string, 
    username: string
}

const db_table: string = "user_chats";

/**
 * Retrieve all users for all rooms
 *
 */
export async function getAllUsersInAllRooms(): Promise<GroupChat[]> {
    return await awaredb(`SELECT * from ${db_table}`);
}