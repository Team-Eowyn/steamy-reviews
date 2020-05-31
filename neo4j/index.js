const neo4j = require('neo4j-driver');
const keys = require('../keys.js');

const driver = neo4j.driver('bolt://localhost:7687/', neo4j.auth.basic(keys.user, keys.pass), { disableLosslessIntegers: true });

module.exports = driver;
