/* eslint-disable no-plusplus */
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');


const gameWriter = csvWriter();
const userWriter = csvWriter();
const PRIMARYRECORDS = 10000000;
const USERS = 10000;


let records = 0;

const generateReviews = (game_id, count) => {
  let reviewWriter;
  if (fs.existsSync('./neo4j/reviews.csv')) {
    reviewWriter = csvWriter({ sendHeaders: false });
  } else {
    reviewWriter = csvWriter();
  }
  reviewWriter.pipe(fs.createWriteStream('./neo4j/reviews.csv', {flags: 'a'}));
  for (let i = 0; i < count; i++) {
    reviewWriter.write({
      id: faker.random.number(10),
      game_id,
      game_reviews: count,
      rating: faker.random.number(count),
      hours: faker.finance.amount(0, 100, 1),
      description: faker.lorem.paragraphs(),
      helpful: faker.random.number(1000),
      funny: faker.random.number(1000),
      date_posted: faker.date.past(),
      thread_length: faker.random.number(50),
      user_id: faker.random.number(100000),
    });
    console.log(`Review # ${i} of ${count} for game id ${game_id} successfully written.`);
  }
  reviewWriter.end();
  console.log('done');
};


const generateGames = () => {
  gameWriter.pipe(fs.createWriteStream('./neo4j/games.csv'));
  for (let i = 0; i < PRIMARYRECORDS; i++) {
    const reviewCount = Math.floor(Math.random(1) * 40);
    gameWriter.write({
      id: records++,
      currentGame: faker.commerce.productName(),
      reviewCount,
    });
    generateReviews(i, reviewCount);
    console.log(`Game # ${i} successfully written.`);
  }
  gameWriter.end();
};

const playerTypes = ['Power Player', '3 Years of Service', 'Walking Tall', 'Amber'];
const generateUsers = () => {
  userWriter.pipe(fs.createWriteStream('./neo4j/users.csv'));
  for (let i = 0; i < USERS; i++) {
    userWriter.write({
      id: i,
      username: faker.internet.userName(),
      recommended: faker.random.boolean(),
      steam_purchaser: faker.random.boolean(),
      numProducts: faker.random.number(500),
      numReviews: faker.random.number(500),
      icon: faker.image.imageUrl(),
      player_type: faker.random.arrayElement(playerTypes),
      xp: faker.random.number(1000),
      friend_level: faker.random.number(50),
      steam_level: faker.random.number(1000),
    });
    console.log(`User # ${i} of ${USERS} successfully written.`);
  }
  userWriter.end();
  console.log('done');
};

generateGames();
generateUsers();
