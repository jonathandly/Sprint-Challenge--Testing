const db = require('./dbConfig');

module.exports = {
    insert,
    findAll,
    findById,
};

async function insert(game) {
    const [id] = await db('games').insert(game);
    return findById(id);
}

function findAll() {
    return db('games');
}

function findById(id) {
    return db('games').where({ id }).first();
}
