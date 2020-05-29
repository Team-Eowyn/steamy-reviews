const session = require('../index.js');

const getGameById = (req, res) => {
  session.run(`MATCH (g:Game) WHERE g.game_id = ${req.params.id} RETURN g`)
    .then((result) => {
      const game = result.records[0].get('g').properties;
      res.status(200).send(game);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error retreiving from database');
    });
};


module.exports = getGameById;
