let awdb = require('../../shared/database/awdb').awdb;

const db_table = "user_accounts"
const db_columns = "username, user_password"

/**
 * Checks if the provided credentials are valid ones.
 *
 * @param {String} username 
 * @param {String} password 
 */
async function isValidLogin(username, password) {
    let conditions = `username = \'${username}\' and user_password = \'${password}'`
    query = await awdb(`SELECT ${db_columns} from ${db_table} WHERE ${conditions};`);

    if (query.rows.length > 1) {
        console.log("Fatal error - more than 1 entry match a username and user_password.");
        return false;
    }

    return query.rows.length === 1;
}

module.exports.isValidLogin = isValidLogin;