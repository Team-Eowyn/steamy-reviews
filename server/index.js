const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const getGameByID = require('../neo4j/Controllers/Game.js');
const
  {
    getReviewsForId,
    updateUpvote,
    createReview,
    deleteReview,
  } = require('../neo4j/Controllers/Review.js');

const getUserById = require('../neo4j/Controllers/User.js');

app.use(express.static(`${__dirname}/../client/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/games/:id', getGameByID);

app.get('/api/users/:id', getUserById);

app.get('/api/reviews/:id', getReviewsForId);
app.post('/api/reviews/:id', createReview);
app.patch('/api/reviews/:id', updateUpvote);
app.delete('/api/review/:id', deleteReview);

module.exports = app;
