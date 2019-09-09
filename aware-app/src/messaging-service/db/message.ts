import awaredb from '../../shared/database/awaredb';
import {UserMessage} from '../../shared/messaging/messenger'
import uuid from '../../shared/uuid/aware-uuid';
import { MessengerChat, ChatDomain} from '../api/Messaging';

export default class Messages {
    private chat: MessengerChat;

    constructor(chat: MessengerChat) {
        this.chat = chat;
    }

    /**
     * insert message into database.
     * 
     * @param {array} message 
     * @param {String} courseId 
     * @param {String} username
     */
    async insertMessage(message: UserMessage): Promise<void> {
        let { username, content, timestamp } = message;
        let user_values: string[] = [`${uuid()}`, `${content}`, `${timestamp}`, `${this.chat.data.id}`, `${username}`];
        let sql: string = '';

        if (this.chat.domain == ChatDomain.COURSE_DISCUSSION) {
            sql = ` INSERT INTO
                        course_messages (message_id, message_content, time_stamp, course_id, username)
                    VALUES
                        ($1, $2, $3, $4, $5)
                    `;
        } else {
            sql = ` INSERT INTO
                        direct_messages (message_id, message_content, time_stamp, direct_message_id, username)
                    VALUES
                        ($1, $2, $3, $4, $5)
                    `;
        }
        
        await awaredb(sql, user_values);
    }

    /**
     * get all messages from the database for the given group.
     */
    async getMessages(): Promise<Object[]> {
        let sql:string = '';

        if (this.chat.domain == ChatDomain.COURSE_DISCUSSION) {
            sql = ` SELECT
                        username,
                        message_content AS content,
                        time_stamp AS timestamp
                    FROM
                        course_messages
                    WHERE
                        course_id = $1`;
        } else {
            sql = ` SELECT
                        username,
                        message_content AS content,
                        time_stamp AS timestamp
                    FROM
                        direct_messages
                    WHERE
                        direct_message_id = $1`;   
        }

        return await awaredb(sql, [`${this.chat.data.id}`]);
    }
}