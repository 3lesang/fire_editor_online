const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();
const route = require('./routes');
const dbo = require('./db');
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({
    extended: true,
    limit: '50mb',
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/*', (req, res) => {
  return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
route(app);
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
  app.listen(port, () => {
    console.log(`App listening at ${port}`);
  });
});
