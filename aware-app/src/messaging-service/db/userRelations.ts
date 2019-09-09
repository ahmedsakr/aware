import awaredb from '../../shared/database/awaredb'

/**
 * Retrieves all users that are connected with the given user through
 * at least one common course.
 *
 * @param username 
 */
export async function getRelatedUsers(username: string): Promise<Object[]> {

    let sql: string = ` SELECT DISTINCT
                            them.username
                        FROM
                            user_courses
                        AS
                            me
                        JOIN
                            user_courses
                        AS
                            them
                        ON
                            me.course_id = them.course_id
                        WHERE
                            me.username=$1 AND them.username != $1;`
    
    return await awaredb(sql, [`${username}`]);
}