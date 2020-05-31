const driver = require('../index.js');

const getGameById = (req, res) => {
  const session = driver.session();
  session.run(`MATCH (g:Game) WHERE g.game_id = ${req.params.id} RETURN g`)
    .then((result) => {
      const game = result.records[0].get('g').properties;
      session.close();
      res.status(200).send(game);
    })
    .catch((error) => {
      session.close();
      console.error(error);
      res.status(500).send('Error retreiving from database');
    });
};


module.exports = getGameById;
