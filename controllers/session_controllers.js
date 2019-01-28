// from auth lesson on w06d05

const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')
const bcrypt = require('bcrypt')

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

sessions.use((req,res,next) => {
  res.locals.user = req.session.user;
  next()
})

module.exports = sessions
