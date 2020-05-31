require('newrelic');
const app = require('./index');

// PORT
const port = 4200;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
