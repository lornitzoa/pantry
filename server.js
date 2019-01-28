// Dependencies
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const port = 3000;

const Food = require('./models/food_model.js');

const Seed = require('./controllers/seed.js');

// Middleware
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/nutritionDB', {useNewUrlParser:true});
mongoose.connection.once('open', () => {
  console.log('Connected to mongo');
})

const foodController = require('./controllers/food.js');
app.use('/pantry', foodController); // pantry is main foods list page.

const seedController = require('./controllers/seed.js');
app.use('/seed', seedController);

app.listen(port, () => {
  console.log(`Connected to port: ${port}`);
})
