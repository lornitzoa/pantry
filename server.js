require('dotenv').config()

// Dependencies
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session')

//Configuration
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI

// Middleware
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }))

// configure sessions
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

// Database
mongoose.connect(mongoURI, { useNewUrlParser: true })
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
