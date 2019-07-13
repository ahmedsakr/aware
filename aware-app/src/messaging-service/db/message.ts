import awaredb from '../../shared/database/awaredb';
import {UserMessage} from '../../shared/messaging/messenger'
import uuid from '../../shared/uuid/aware-uuid';

export default class Messages {
    courseId : string | null = null;

    constructor(courseId: string) {
        this.courseId = courseId;
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
        let user_values = [`${uuid()}`, `${content}`, `${timestamp}`, `${this.courseId}`, `${username}`];
        let sql = ` INSERT INTO course_messages
                        (message_id, message_content, time_stamp, course_id, username)
                    VALUES
                        ($1, $2, $3, $4, $5)
                    `;
        
        await awaredb(sql, user_values);
    }

    /**
     * get all messages from the database for the given group.
     */
    async getMessages(): Promise<Object[]> {
        let sql = ` SELECT
                        username,
                        message_content AS content,
                        time_stamp AS timestamp
                    FROM course_messages
                    WHERE course_id = $1`;

        return await awaredb(sql, [`${this.courseId}`]);
    }
}