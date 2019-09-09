import awaredb from '../../shared/database/awaredb'

/**
 * Start a new direct message with a related user.
 *
 * @param myUsername The username of the user submitting this request
 */
export async function startDirectMessage(id: string, myUsername: string, theirUsername: string) {
    let sql = ` INSERT INTO
                    user_direct_messages (direct_message_id, user_initiator, user_target)
                VALUES
                    ($1, $2, $3)
            `;
    
    await awaredb<Object>(sql, [`${id}`, `${myUsername}`, `${theirUsername}`]);
}

export async function isExistingDirectMessage(id: string): Promise<Boolean> {
    let sql = ` SELECT
                    *
                FROM
                    user_direct_messages
                WHERE
                    direct_message_id=$1
            `;

    return (await awaredb(sql, [`${id}`])).length !== 0;
}