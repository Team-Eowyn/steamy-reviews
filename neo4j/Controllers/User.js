const driver = require('../index.js');


const getUserById = (req, res) => {
  const session = driver.session();

  session.run(`MATCH (u:User) 
               WHERE u.user_id=${req.params.id}
               RETURN u`)
    .then((result) => {
      const user = result.records[0].get('u').properties;
      session.close();
      res.status(200).send(user);
    })
    .catch((error) => {
      console.error(error);
      session.close();
      res.status(500).send('Error retreiving user from database');
    });
};


module.exports = getUserById;
