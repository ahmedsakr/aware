import awaredb from '../../shared/database/awaredb';

export default async function getRooms(username: string): Promise<Object[]> {
    let sql =   `SELECT group_name AS name, group_icon AS icon, user_chats.group_id FROM user_chats
                JOIN messenger_group ON user_chats.group_id = messenger_group.group_id
                WHERE username = '${username}'`;

    return await awaredb(sql);
}