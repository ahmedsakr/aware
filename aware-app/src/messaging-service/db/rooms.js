let awaredb = require('../../shared/database/awaredb');

async function getRooms(username) {
    let sql = `SELECT group_id, name FROM user_groups WHERE username = '${username}'`;
    return await awaredb.query(sql);
}

module.exports.getRooms = getRooms;