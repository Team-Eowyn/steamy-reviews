# Reviews
This is the Reviews component for the System Design Capstone done at Hack Reactor.

This app:
* renders and append review data to the page
* incorporates UI with each review like linking to the full review or showing profile data

## Getting Started

```sh
npm install -g webpack
npm install
```


## Running the tests

```sh
npm run test
```

## Built With

* [axios](https://www.npmjs.com/package/axios) - HTTP client for browser and node.js
* [express](https://expressjs.com/) - web framework used
* [mongoose](https://mongoosejs.com/) - ORM for database

## CRUD

| Http Verbs | Endpoint         | Action                            |
|------------|------------------|-----------------------------------|
| POST       | /api/reviews/    | Creates a review for 1 game       |
| GET        | /api/reviews/:id | Gets a list of reviews for 1 game |
| PUT        | /api/reviews/:id | Updates a review for 1 game       |
| DELETE     | /api/reviews/:id | Deletes all reviews for 1 game    |
