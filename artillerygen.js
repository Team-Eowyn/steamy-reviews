const Faker = require('faker');

function generateId(userContext, events, done) {
  const id = Faker.random.number(10000000);
  userContext.vars.id = id;

  return done();
}

function generateReview(userContext, events, done) {
  const id = Faker.random.number(10000000);
  const hours = Faker.random.number(100);
  const user_id = Faker.random.number(100000);
  const rating = Faker.random.number(10);
  const description = Faker.lorem.paragraph();

  userContext.vars.id = id;
  userContext.vars.hours = hours;
  userContext.vars.rating = rating;
  userContext.vars.description = description;
  userContext.vars.user_id = user_id;

  return done();
}


module.exports = {
  generateReview,
  generateId,
};
