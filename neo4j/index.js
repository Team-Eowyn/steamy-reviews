const neo4j = require('neo4j-driver');
const keys = require('../keys/neo4j.js');

const driver = neo4j.driver('bolt://localhost:7687/', neo4j.auth.basic(keys.user, keys.pass));

const session = driver.session();


module.exports = session;
