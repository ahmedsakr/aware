let awaredb = require('../../shared/database/awaredb');

async function getRooms(username) {
    let sql =   `SELECT group_name AS name, group_icon AS icon, user_chats.group_id FROM user_chats
                JOIN messenger_group ON user_chats.group_id = messenger_group.group_id
                WHERE username = '${username}'`;

    return await awaredb.query(sql);
}

module.exports.getRooms = getRooms;