import awaredb from '../../shared/database/awaredb';
import { AccountField } from '../../shared/verification/user';

export type Room = {
    group_id: string
}

export async function getRooms(username: AccountField): Promise<Room[]> {
    let sql =   `SELECT group_name AS name, group_icon AS icon, user_chats.group_id FROM user_chats
                JOIN messenger_group ON user_chats.group_id = messenger_group.group_id
                WHERE username = $1`;

    return await awaredb(sql, [`${username}`]);
}