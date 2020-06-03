const neo4j = require('neo4j-driver');
const keys = require('../keys.js');

const user = process.env.NEO4J_USER || keys.user;
const pass = process.env.NEO4J_PASS || keys.pass;
const driver = neo4j.driver('bolt://18.220.31.247:7687/', neo4j.auth.basic(user, pass), { disableLosslessIntegers: true });

module.exports = driver;
