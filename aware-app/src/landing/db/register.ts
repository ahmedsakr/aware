import awaredb from '../../shared/database/awaredb'
import {verifyPassword, verifyUsername, AccountField, FieldValidationResult} from '../../shared/verification/user'
const db_table = "user_accounts"

/**
 * Checks if the username is already taken by someone else.
 * 
 * @param {String} username 
 */
async function isExistingUser(username: string) : Promise<boolean> {
    let query = await awaredb(`SELECT username from ${db_table} WHERE username='${username}'`);
    return query.length === 1;
}

/**
 * Attempts to register the user into the database.
 * 
 * @param {String} username 
 * @param {String} password 
 */
async function registerUser(username: AccountField, password: AccountField) : Promise<boolean> {

    if (verifyUsername(username) != FieldValidationResult.FIELD_VALIDATED ||
        verifyPassword(password) != FieldValidationResult.FIELD_VALIDATED) {
        return false;
    }

    if (await isExistingUser(username as string)) {
        return false;
    }

    let db_columns = "username, user_password";
    let user_values = `'${username}', '${password}'`;
    await awaredb(`INSERT INTO ${db_table} (${db_columns}) VALUES (${user_values})`);
    return true;
}

export default registerUser;