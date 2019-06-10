import awaredb from '../../shared/database/awaredb'

const db_table: string = "user_accounts";
const db_columns: string = "username, user_password";
 
/**
 * Checks if the provided credentials are valid ones.
 *
 * @param {String} username 
 * @param {String} password 
 */
export default async function verifyLogin(username: string, password: string): Promise<boolean> {
    let conditions = `username = '${username}' and user_password = '${password}'`
    let query = await awaredb(`SELECT ${db_columns} from ${db_table} WHERE ${conditions}`);

    if (query.length > 1) {
        console.log("Fatal error - more than 1 entry match a username and user_password.");
        return false;
    } else {
        return query.length === 1;
    }
}