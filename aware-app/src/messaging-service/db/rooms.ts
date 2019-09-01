import awaredb from '../../shared/database/awaredb';
import { ChatData } from '../api/Messaging';

export default async function getCourses(username: string): Promise<ChatData[]> {
    let sql =   `SELECT
                    course_name AS name,
                    course_icon AS icon,
                    user_courses.course_id AS id
                 FROM user_courses
                 JOIN courses ON
                    user_courses.course_id = courses.course_id
                 WHERE username = $1`;

    return await awaredb<ChatData>(sql, [`${username}`]);
}