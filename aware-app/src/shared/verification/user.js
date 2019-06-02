/**
 * Length constraints for usernames and passwords as per the
 * database schema.
 */
const usernameMinimum = 3;
const usernameMaximum = 32;
const passwordMinimum = 8;
const passwordMaximum = 128;

function verifyUsername(username) {
    return  username !== null && username !== "" &&
            username.length >= usernameMinimum && username.length <= usernameMaximum;
}
function verifyPassword(password) {
    return  password !== null && password !== "" &&
            password.length >= passwordMinimum && password.length <= passwordMaximum;
}

module.exports.verifyUsername = verifyUsername;
module.exports.verifyPassword = verifyPassword;