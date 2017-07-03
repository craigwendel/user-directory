const express = require('express')
const path = require('path')
const mustacheExpress = require('mustache-express')
const app = express()

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/robots'

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'mustache')

app.get('/users', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      throw err
    } else {
      console.log('Successfully connected to the database')
    }
    const data = require('./data')
    for (var i = 0; i < data.users.length; i++) {
      let user = data.users[i]
      db.collection('users').updateOne(
        {id: user.id},
        user,
        {upsert: true}
      )
    }
    db.collection('users')
  .find()
  .toArray(function (err, documents) {
    res.render('users', {allUsers: documents})
  })
  })
})

app.get('/users/unemployed', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      throw err
    } else {
      console.log('Successfully connected to the database')
    }
    db.collection('users')
  .find({job: null})
  .toArray(function (err, documents) {
    res.render('unemployed', {allUsers: documents})
  })
  })
})

app.get('/users/employed', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      throw err
    } else {
      console.log('Successfully connected to the database')
    }
    db.collection('users')
  .find({job: {$ne : null}})
  .toArray(function (err, documents) {
    res.render('employed', {allUsers: documents})
  })
  })
})

app.get('/users/:id', function (req, res) {
  let id = parseInt(req.params.id)
  MongoClient.connect(url, function (err, db) {
    if (err) {
      throw err
    } else {
      console.log('Successfully connected to the database')
    }
    db.collection('users')
  .findOne({id: id}, function (err, documents) {
    res.render('users', {userDetails: documents})
  })
})
})

app.listen(3000, function () {
  console.log('Successfully started Robots application!')
})
