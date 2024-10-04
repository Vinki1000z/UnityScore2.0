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

app.use(cors({
  origin: '*',  // In production, replace '*' with a specific domain.
  methods: 'GET, POST, PUT, DELETE, OPTIONS',  // Specify allowed methods.
  allowedHeaders: 'Content-Type, Authorization',  // Specify allowed headers.
}));

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/feed', feedRoutes);


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
