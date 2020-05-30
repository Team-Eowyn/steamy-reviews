const session = require('../index.js');


const getUserById = (req, res) => {
  session.run(`MATCH (u:User) 
               WHERE u.user_id=${req.params.id}
               RETURN u`)
    .then((result) => {
      const user = result.records[0].get('u').properties;
      res.status(200).send(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error retreiving user from database');
    });
};


module.exports = getUserById;
