let uuid = require('uuid/v1');

/**
 * Generate a 36-character long UUID based on the current
 * timestamp.
 */
function generateUuid() {
    return uuid();
}

module.exports.uuid = generateUuid;