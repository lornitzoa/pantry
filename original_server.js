// Dependencies
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;



// Middleware
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/nutritionDB', {useNewUrlParser:true});
mongoose.connection.once('open', () => {
  console.log('Connected to mongo');
})



app.listen(port, () => {
  console.log(`Connected to port: ${PORT}`);
})
