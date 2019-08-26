import awaredb from '../../shared/database/awaredb'
import uuid from '../../shared/uuid/aware-uuid'

/**
 * Start a new direct message with a related user.
 *
 * @param myUsername The username of the user submitting this request
 */
export async function startDirectMessage(myUsername: string) {
    let sql = ` INSERT INTO user_direct_messages
                    (direct_message_id, username)
                VALUES
                    ($1, $2)
            `;
    
    await awaredb(sql, [`${uuid()}`, `${myUsername}`]);
}

export async function isExistingDirectMessage(id: string): Promise<Boolean> {
    let sql = ` SELECT
                    *
                FROM
                    user_direct_messages
                WHERE
                    direct_message_id=$1
            `;

    let result: Object[] = await awaredb(sql, [`${id}`]);
    return result.length !== 0;
}