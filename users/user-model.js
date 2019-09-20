const db = require('../database/dbConfig.js');

module.exports = {
    add,
    find, 
    findBy,
    findById
};

function find() {
    return db('users')
};

function findBy(filter) {
    return db('users').where(filter).first()
};

function findById(id) {
    return db('users').where({id}).first()
};

function add(user) {
    return db('users')
        .insert(user)
        .then(([id]) => {
            return findById(id)
        });
};