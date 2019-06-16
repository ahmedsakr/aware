import uuid from 'uuid/v1'

/**
 * Generate a 36-character long UUID based on the current
 * timestamp.
 */
export default function generateUuid() {
    return uuid();
}