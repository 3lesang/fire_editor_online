const express = require('express');
const cors = require('cors');
const app = express();
const route = require('./routes');
const dbo = require('./db');
const port = 8000;
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({
    extended: true,
    limit: '50mb',
  })
);
app.use(express.json());
route(app);
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
});
