// Config file for the app, all requirements and parameters are set here

// Requirements for using sessions
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const express = require('express')


module.exports = app => {

  // For post requests, body encoded data
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))


  // Static files access
  app.use(express.static('lib/assets'))
  app.use('/files', express.static('files'))
  app.set('files', './files')


  // Session parameters
  app.use(session({
    secret: 'ssdcmspassword531',
    resave: true,
    saveUninitialized: true
  }))


  // Flash messages (live with the session)
  app.use(flash())


  // View templater
  app.set('view cache', false)
  app.set('view engine', 'pug')
  app.set('views', './lib/views')
}
