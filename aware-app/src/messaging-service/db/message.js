let awaredb = require('../../shared/database/awaredb');
let uuid = require ('../../shared/uuid/aware-uuid').uuid;
let db_table = "message"

/**
 * insert message into database.
 * 
 * @param {array} message 
 */
async function insertMessage(message) {
    let {text, timestamp} = message;
    let db_columns = 'message_id, message_content, time_stamp';
    let user_values = `'${uuid()}', '${text}', '${timestamp}'`;
    await awaredb.query(`INSERT INTO ${db_table} (${db_columns}) VALUES (${user_values})`);
}

/**
 * get all messages from the database for a given group.
 * 
 * @param {String} groupId 
 */
async function getMessages(groudId) {
    return await awaredb.query(`SELECT user_accounts.username, message.message_content, message.time_stamp FROM messages JOIN message ON messages.message_id = message.message_id JOIN groups ON messages.group_id = groups.group_id JOIN user_accounts ON groups.user_id = user_accounts.user_id WHERE messages.group_id = '${groudId}'`);
}

module.exports.insertMessage = insertMessage;
module.exports.getMessages = getMessages;