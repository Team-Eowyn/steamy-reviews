const express = require('express');

const app = express();

// MIDDLEWARE
const bodyParser = require('body-parser');
const db = require('../db/index.js');

app.use(express.static(`${__dirname}/../client/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES

app.get('/api/reviews/:id', (req, res) => {
  db.find(req.params.id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.put('/api/reviews/:id', (req, res) => {
  const id = req.params;
  const data = {
    id: req.body.id,
    game: req.body.game,
    game_reviews: req.body.game_reviews,
    rating: req.body.rating,
    hours: req.body.hours,
    description: req.body.description,
    helpful: req.body.helpful,
    funny: req.body.funny,
    date_posted: req.body.date_posted,
    language: req.body.language,
    thread_length: req.body.thread_length,
    user: req.body.user,
  };
  db.updateAll(id, data, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(204).json(results);
    }
  });
});
/* CREATE */
app.post('/api/reviews/', (req, res) => {
  const data = {
    id: req.body.id,
    game: req.body.game,
    game_reviews: req.body.game_reviews,
    rating: req.body.rating,
    hours: req.body.hours,
    description: req.body.description,
    helpful: req.body.helpful,
    funny: req.body.funny,
    date_posted: req.body.date_posted,
    language: req.body.language,
    thread_length: req.body.thread_length,
    user: req.body.user,
  };
  db.create(data, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

/* PATCH */
app.patch('/api/reviews/:id', (req, res) => {
  const { id } = req.params;
  const { reviewId } = req.body;
  const { field } = req.body;
  const { value } = req.body;
  db.update(id, reviewId, field, value, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(204).json(results);
    }
  });
});

/* DESTROY */
app.delete('/api/reviews/:id', (req, res) => {
  const { id } = req.params;
  db.delete(id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});
module.exports = app;
