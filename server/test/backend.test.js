/* eslint-disable no-undef */

require('regenerator-runtime/runtime');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../index.js');

const request = supertest(app);

const databaseName = 'steamy';

// connect to db
beforeAll(() => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

// test get request on server
describe('Test the GET routes', () => {
  test('It should respond 200 for the GET method', async (done) => {
    const res = await request.get('/api/reviews/1');
    expect(res.statusCode).toBe(200);
    done();
  });
  // test get route to database with fake data
  test('Should find items in database', async (done) => {
    const res = await request.get('/api/reviews/1')
      .send({
        game: 'Practical Granite Car',
      });

    expect(res.body).toBeDefined();
    expect(res.statusCode).toBe(200);
    done();
  });
});

describe('Test the PATCH routes', () => {
  test('It should response the PATCH method', async (done) => {
    const res = await request.patch('/api/reviews/1');
    expect(res.statusCode).toBe(204);
    done();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
