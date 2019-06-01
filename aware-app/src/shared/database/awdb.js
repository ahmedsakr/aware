const {Pool} = require('pg');
const db = new Pool();

/**
 * Asynchronously query the aware database.
 * 
 * @param {String} queryStr The string representation of the query. 
 */
async function awdb(queryStr) {
    if (queryStr[queryStr.length - 1] !== ';') {
        return await db.query(queryStr + ';');
    } else {
        return await db.query(queryStr)
    }
}

/**
 * Destroy the connection to the database. This should only be called on
 * exit of the server because we would like the Pool connection to remain
 * open throughout the lifetime of the server.
 */
async function destroy() {
    return await db.end()
}

module.exports.awdb = awdb;