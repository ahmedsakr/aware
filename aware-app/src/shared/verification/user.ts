/**
 * Length constraints for usernames and passwords as per the
 * database schema.
 */
const usernameMinimum = 3;
const usernameMaximum = 32;
const passwordMinimum = 8;
const passwordMaximum = 128;

export function verifyUsername(username: string | undefined | null) {
    return  username && username !== "" &&
            username.length >= usernameMinimum && username.length <= usernameMaximum;
}
export function verifyPassword(password: string | undefined | null) {
    return  password && password !== "" &&
            password.length >= passwordMinimum && password.length <= passwordMaximum;
}