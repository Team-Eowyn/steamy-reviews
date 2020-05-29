/* eslint-disable camelcase */
const session = require('../index.js');

const getReviewsForId = (req, res) => {
  const cypher = `MATCH (u:User)-[]-(r:Review)-[]-(g:Game)
                  WHERE g.game_id =${req.params.id}
                  RETURN g, r{.*, user: u}`;
  const results = [];
  session.run(cypher)
    .then((result) => {
      result.records.forEach((record) => {
        const review = record.get('r');
        review.user = review.user.properties;
        results.push(review);
      });
      res.status(200).send(results);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error retreiving reviews from database');
    });
};

const createReview = (req, res) => {
  const {
    hours,
    user_id,
    rating,
    description,
  } = req.body;

  const date = Date(Date.now()).toString();
  const game_id = req.params.id;
  const cypher = `MATCH (s:Sequence), (g:Game), (u:User) 
                  WHERE g.game_id = ${game_id} AND u.user_id = ${user_id}
                  SET g.reviewCount = g.reviewCount +1
                  SET u.numReviews = u.numReviews + 1
                  SET s.review = s.review+1
                  CREATE (r:Review {review_id:s.review, hours: ${hours}, 
                  date_posted: '${date}', user_id: ${user_id}, thread_length:0, 
                  rating: ${rating}, description:'${description}', 
                  game_reviews: g.reviewCount, helpful: 0, funny: 0, 
                  game_id: ${game_id}})
                  CREATE (u)-[:CREATED]->(r)-[:REVIEW_OF]->(g)
                  return s, g, u, r`;
  session.run(cypher)
    .then(() => {
      res.status(200).send('Review created');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error creating review.');
    });
};

const updateUpvote = (req, res) => {
  const cypher = `MATCH (r:Review) WHERE r.review_id=${req.body.reviewId} 
                  SET r.${req.body.field}=${req.body.value}
                  Return r`;
  session.run(cypher)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error updating upvote in database');
    });
};

const deleteReview = (req, res) => {
  const cypher = `MATCH (r:Review { review_id: ${req.params.id} })
                  DETACH DELETE n`;
  session.run(cypher)
    .then(() => {
      res.status(200).send('Successfully deleted review.');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error deleting review from database');
    });
};


module.exports = {
  getReviewsForId,
  updateUpvote,
  createReview,
  deleteReview,
};
