import awaredb from '../../shared/database/awaredb';
import uuid from '../../shared/uuid/aware-uuid';
const db_table = "messages"

interface Message {
    content: string,
    timestamp: string
}

export default class Messages {
    groupId : string | null = null;

    constructor(groupId: string) {
        this.groupId = groupId;
    }

    /**
     * insert message into database.
     * 
     * @param {array} message 
     * @param {String} groupId 
     * @param {String} username
     */
    async insertMessage(message: Message, username: string): Promise<void> {
        let { content, timestamp } = message;
        let db_columns = 'message_id, message_content, time_stamp, group_id, username';
        let user_values = [`${uuid()}`, `${content}`, `${timestamp}`, `${this.groupId}`, `${username}`];
        await awaredb(`INSERT INTO ${db_table} (${db_columns}) VALUES ($1, $2, $3, $4, $5)`, user_values);
    }

    /**
     * get all messages from the database for the given group.
     */
    async getMessages(): Promise<Object[]> {
        let sql = `SELECT user_accounts.username, messages.message_content 
                AS content, messages.time_stamp AS timestamp FROM messages 
                JOIN user_chats ON messages.group_id = user_chats.group_id 
                AND messages.username = user_chats.username JOIN user_accounts 
                ON user_chats.username = user_accounts.username JOIN messenger_group 
                ON user_chats.group_id = messenger_group.group_id 
                WHERE messages.group_id = '${this.groupId}'`;

        return await awaredb(sql);
    }
}