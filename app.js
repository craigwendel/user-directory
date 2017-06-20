const express = require('express')
const path = require('path')
const mustacheExpress = require('mustache-express')
const data = require('./data.js')
const app = express()

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'mustache')

app.get ('/users', function (req, res){
  let userData = data.users
  res.render('users', {allUsers: userData})
})
app.get ('/users/:id', function (req, res){
  let userID = req.params.id
  let userData = data.users
  res.render('users', {userDetails: userData})
})
app.listen(3000, function () {
  console.log('Successfully started express application!')
})
