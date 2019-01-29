// from auth lesson on w06d05

const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')
const bcrypt = require('bcrypt')
const session = require('express-session');

// log in form
sessions.get('/newsessions', (req, res) => {
  res.render('./sessions/newsession.ejs')
})

// create a new session
sessions.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (!foundUser) {
      res.send('user not found!')
      // console.log(req.body.password, foundUser)
      // from input in browser === found from database
    } else if (req.body.password === foundUser.password) {
      if (err) console.log(err)
      req.session.currentUser = foundUser
      res.redirect('/pantry')
    } else {
      res.send('<a href="/">Wrong Password</a>')
    }
  })
})

// saves session user to pass to any template
// support from https://stackoverflow.com/questions/37183766/how-to-get-the-session-value-in-ejs
sessions.use((req,res,next) => {
  res.locals.user = req.user;
  next()
})

module.exports = sessions
