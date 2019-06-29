import awaredb from '../../shared/database/awaredb'
import {verifyPassword, verifyUsername, AccountField, FieldValidationResult} from '../../shared/verification/user'

const db_table: string = "user_accounts";
const db_columns: string = "username, user_password";
 
/**
 * Checks if the provided credentials are valid ones.
 *
 * @param {String} username 
 * @param {String} password 
 */
async function verifyLogin(username: AccountField, password: AccountField): Promise<boolean> {

    if (verifyUsername(username) !== FieldValidationResult.FIELD_VALIDATED ||
        verifyPassword(password) !== FieldValidationResult.FIELD_VALIDATED) {
        return false;
    }

    let conditions = `username = '${username}' and user_password = '${password}'`
    let query = await awaredb(`SELECT ${db_columns} from ${db_table} WHERE ${conditions}`);

    if (query.length > 1) {
        console.log("Fatal error - more than 1 entry match a username and user_password.");
        return false;
    } else {
        return query.length === 1;
    }
}

export default verifyLogin;