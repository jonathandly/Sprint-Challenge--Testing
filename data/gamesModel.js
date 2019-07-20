const db = require('./dbConfig');

module.exports = {
    add,
    findAll,
    findById,
};

async function add(game) {
    const [id] = await db('games').insert(game);
    return findById(id);
}

function findAll() {
    return db('games');
}

function findById(id) {
    return db('games').where({ id }).first();
}
