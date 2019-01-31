require('dotenv').config()

// Dependencies
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

app.use(express.static('public'));

//Configuration
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/pantry'

// Middleware
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }))

// configure sessions
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/sessionInfo',
  collection: 'pantry'
})

store.on('error', (err) => {
  console.log(err);
})

app.use(session({
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}))

// app.use(session({
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: false
// }))

// Database
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })


db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));


mongoose.connection.once('open', () => {
  console.log('connected to mongo')
})


// Routes
app.get('/', (req, res) => {
  res.render(
    './sessions/login.ejs',
    {
      currentUser: req.session.currentUser
    }
  )
})

const userController = require('./controllers/users_controllers.js')
app.use('/users', userController)

const sessionsController = require('./controllers/session_controllers.js')
app.use('/sessions', sessionsController)

const pantryController = require('./controllers/food.js');
app.use('/pantry', pantryController);

app.listen(PORT, () => {
  console.log(`connected to ${PORT}`);
})
