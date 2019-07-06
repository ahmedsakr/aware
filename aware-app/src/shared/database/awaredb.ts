import postgres from 'pg';

const db = new postgres.Pool();

/**
 * Asynchronously query the aware database, returning the rows resulting from the
 * transaction.
 * 
 * @param {String} queryStr The string representation of the query. 
 */
export default async function query(queryStr: string | null, userInput?: string[]): Promise<Object[]> {

    if (queryStr === null || queryStr === "") {
        return Promise.reject("invalid query string");
    }

    let result: Object[] = [];  

    // Insert the query-terminating semicolon if it was not given.
    if (queryStr[queryStr.length - 1] !== ';') {
        queryStr = queryStr + ';';
    }

    await db.query(queryStr, userInput)
    .then((data: postgres.QueryResult) => {
        if (data.rowCount > 0) {
            result = data.rows;
        }
    })
    .catch(() => {
        return Promise.reject("invalid query");
    });

    return result;
}

/**
 * Destroy the connection to the database. This should only be called on
 * exit of the server because we would like the Pool connection to remain
 * open throughout the lifetime of the server.
 */
export async function destroy(): Promise<void> {
    return await db.end();
}