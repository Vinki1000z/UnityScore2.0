const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const feedRoutes = require('./routes/feed');
const port = 5000;
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/feed', feedRoutes);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.send("Hello");
});

mongoose
  .connect(process.env.MONOGODB_URL, {
    dbName: 'CodeForum_DB',
  })
  .then((result) => {
    console.log('DataBase Connected');
    app.listen(8080);
  })
  .catch((err) => console.log(err));
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
