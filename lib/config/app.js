const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const express = require('express');

module.exports = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static('lib/assets'))
  app.use('/files', express.static('files'))

  app.use(session({
    secret: 'ssdcmspassword531',
    resave: true,
    saveUninitialized: true
  }));

  app.use(flash());


  app.set('view cache', false);
  app.set('view engine', 'pug');

  app.set('files', './files');

  app.set('views', './lib/views');
};
