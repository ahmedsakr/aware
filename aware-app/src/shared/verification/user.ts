/**
 * Length constraints for usernames and passwords as per the
 * database schema.
 */
let usernameMinimum = 3;
let usernameMaximum = 32;
let passwordMinimum = 8;
let passwordMaximum = 128;

export function verifyUsername(username: string | undefined | null) {
    return  username && username !== "" &&
            username.length >= usernameMinimum && username.length <= usernameMaximum;
}
export function verifyPassword(password: string | undefined | null) {
    return  password && password !== "" &&
            password.length >= passwordMinimum && password.length <= passwordMaximum;
}