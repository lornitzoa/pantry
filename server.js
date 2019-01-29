//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const session = require('express-session');
const bcrypt = require('bcrypt');
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

app.use(session({
  secret: 'potatohoe',
  resave: false,
  saveUninitialized: false
}))

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+ `pantry`;

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});


//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form



//___________________
//Configure Sessions
//___________________


// app.get('/', (req, res) => {
//   res.render(
//     './food_pages/login.ejs',
//     {
//       user: req.session.currentUser.username
//     }
//   )
// })


const userController = require('./controllers/users_controllers.js');
app.use('/users', userController)

const sessionController = require('./controllers/session_controllers.js');
app.use('/sessions', sessionController)



//___________________
// Routes
//___________________
//localhost:3000
// app.get('/' , (req, res) => {
// res.send('Hello World!');
// });
const Food = require('./models/food_model.js');
const Seed = require('./controllers/seed.js');
const foodController = require('./controllers/food.js');
const seedController = require('./controllers/seed.js');

app.use('/pantry', foodController); // pantry is main foods list page.

// app.use('/seed', seedController);

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
