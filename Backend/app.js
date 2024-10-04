const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const feedRoutes = require('./routes/feed');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
// CORS Middleware setup (this should be at the top)
app.use(cors({
  origin: '*',  // In production, replace '*' with the specific domain(s) allowed to access the resources.
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],  // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
}));

app.use(bodyParser.json());

// Define routes after CORS middleware
app.use('/auth', authRoutes);
app.use('/feed', feedRoutes);

app.get('/', (req, res) => {
  res.send("Hello");
});

// Database connection
mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: 'CodeForum_DB',
  })
  .then((result) => {
    console.log('Database Connected');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
