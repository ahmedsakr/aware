export enum AccountFields {
    USERNAME,
    PASSWORD
}

// The test subjects are user-provided, so it is important to
// categorize them as possibly null or undefined.
export type AccountField = string | undefined | null;

export enum FieldValidationResult {
    FIELD_VALUE_UNDEFINED_OR_NULL,
    FIELD_VALUE_OUT_OF_BOUNDS,
    FIELD_VALUE_ILLEGAL,
    FIELD_VALIDATED
}

interface FieldConstraints {
    minimumSize: number,
    maximumSize: number,
    illegalCharacters?: RegExp
}

/**
 * Length constraints for usernames and passwords as per the
 * database schema.
 */
const usernameConstraints : FieldConstraints = {
    minimumSize: 3,
    maximumSize: 32,

    // All forms of quotes are banned from being part of a username
    illegalCharacters: /[\'\"\`]/g
}

const passwordConstraints : FieldConstraints = {
    minimumSize: 8,
    maximumSize: 128
}


type FieldValidation = (field: AccountField, bounds: FieldConstraints) => FieldValidationResult;

/**
 * Validate selected properties of the field, including size of the field
 * and (if specified) the legality of the field value.
 *
 * @param field User-provided account field
 * @param bounds Size constraints imposed on the field
 */
let validateField: FieldValidation = (field: AccountField, constraints: FieldConstraints) => {
    if (field === undefined || field == null) {
        return FieldValidationResult.FIELD_VALUE_UNDEFINED_OR_NULL;
    }

    if (field.length < constraints.minimumSize || field.length > constraints.maximumSize) {
        return FieldValidationResult.FIELD_VALUE_OUT_OF_BOUNDS;
    }

    if (constraints.illegalCharacters !== undefined && field.match(constraints.illegalCharacters) !== null) {
        return FieldValidationResult.FIELD_VALUE_ILLEGAL;
    }

    return FieldValidationResult.FIELD_VALIDATED;
}

/**
 * Validate the username field filled by the user.
 *
 * @param username User-provided value of a username
 */
export function verifyUsername(username: AccountField): FieldValidationResult {
    return validateField(username, usernameConstraints);
}

/**
 * Validate the password field filled by the user.
 *
 * @param password User-provided value of a password
 */
export function verifyPassword(password: AccountField): FieldValidationResult {
    return validateField(password, passwordConstraints);
}

/**
 * Provides a mapping for validation results to user-readable error messages.
 *
 * @param field The field that was validated
 * @param error The associated validation error code
 */
export function getValidationError(field: AccountFields, error: FieldValidationResult) {

    let fieldName : string | null = null;
    let fieldConstraints : FieldConstraints | null = null;

    if (field == AccountFields.USERNAME) {
        fieldName = "Username";
        fieldConstraints = usernameConstraints;
    } else if (field == AccountFields.PASSWORD){
        fieldName = "Password";
        fieldConstraints = passwordConstraints;
    } else {

        // Unrecognized account field.
        return null;
    }

    switch (error) {
        case FieldValidationResult.FIELD_VALUE_ILLEGAL:
            return `${fieldName} value contains illegal characters.`;
        case FieldValidationResult.FIELD_VALUE_OUT_OF_BOUNDS:
            return  `${fieldName} value must be between ${fieldConstraints.minimumSize} and ` +
                    `${fieldConstraints.maximumSize} characters, inclusively.`;
        case FieldValidationResult.FIELD_VALUE_UNDEFINED_OR_NULL:
            return `${fieldName} value not available.`;
        default:
            return `${fieldName} is valid.`;
    }
}