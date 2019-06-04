let awaredb = require('../../shared/database/awaredb');
let uuid = require ('../../shared/uuid/aware-uuid').uuid;
let db_table = "messages"

/**
 * insert message into database.
 * 
 * @param {array} message 
 * @param {String} groupId 
 * @param {String} username 
 */
async function insertMessage(message, groupId, username) {
    let {content, timestamp} = message;
    let db_columns = 'message_id, message_content, time_stamp, group_id, username';
    let user_values = `'${uuid()}', '${content}', '${timestamp}', '${groupId}', '${username}'`;
    await awaredb.query(`INSERT INTO ${db_table} (${db_columns}) VALUES (${user_values})`);
}

/**
 * get all messages from the database for a given group.
 * 
 * @param {String} groupId 
 */
async function getMessages(groupId) {
    let sql = `SELECT user_accounts.username, messages.message_content 
                AS content, messages.time_stamp AS timestamp FROM messages 
                JOIN user_chats ON messages.group_id = user_chats.group_id 
                AND messages.username = user_chats.username JOIN user_accounts 
                ON user_chats.username = user_accounts.username JOIN messenger_group 
                ON user_chats.group_id = messenger_group.group_id 
                WHERE messages.group_id = '${groupId}'`;

    return await awaredb.query(sql);
}

module.exports.insertMessage = insertMessage;
module.exports.getMessages = getMessages;