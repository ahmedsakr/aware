let awaredb = require('../../shared/database/awaredb');
let verification = require('../../shared/verification/user');
let db_table = "user_accounts"

/**
 * Checks if the username is already taken by someone else.
 * 
 * @param {String} username 
 */
async function isExistingUser(username) {
    let query = await awaredb.query(`SELECT username from ${db_table} WHERE username='${username}'`);

    if (query.length > 1) {
        console.log("Fatal error - more than 1 entry match a username and user_password.");
        return false;
    } else {
        return query.length === 1;
    } 
}

/**
 * Attempts to register the user into the database.
 * 
 * @param {String} username 
 * @param {String} password 
 */
async function registerUser(username, password) {

    if (!verification.verifyUsername(username) || !verification.verifyPassword(password)) {
        return false;
    }

    if (await isExistingUser(username)) {
        return false;
    }

    let db_columns = "username, user_password";
    let user_values = `'${username}', '${password}'`;
    return await awaredb.query(`INSERT INTO ${db_table} (${db_columns}) VALUES (${user_values})`);
}

module.exports.registerUser = registerUser;