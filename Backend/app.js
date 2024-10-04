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


app.use(cors({
  origin: 'https://unity-score2-0-m94p9mk05-vikrant-chauhans-projects-59869ee4.vercel.app', // Replace this with your actual frontend URL
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

// Alternatively, using custom headers:
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://unity-score2-0-m94p9mk05-vikrant-chauhans-projects-59869ee4.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
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
