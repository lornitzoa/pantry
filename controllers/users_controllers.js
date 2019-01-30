// from auth lesson on w06d05

const express = require('express')
const users = express.Router()
const User = require('../models/users.js')
const bcrypt = require('bcrypt')

users.get('/newuser', (req, res) => {
  res.render('./users/newuser.ejs')
})

users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
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
