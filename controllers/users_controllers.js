// from auth lesson on w06d05

const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

users.get('/newuser', (req, res) => {
  res.render('./users/newuser.ejs')
})

users.post('/', (req, res) => {
  User.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err)
    } else {
      console.log(createdUser)
      res.redirect('/')
    }
  })
})

module.exports = users
