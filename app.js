'use strict';

const PORT = process.env.PORT || 8000;

// LOAD DEPENDENCIES
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

// GENERAL PURPOSE MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// SET STATICS
app.use(express.static('public'));

// SET VIEW ENGINE
app.set('view engine', 'ejs');

// ROUTES
app.use('/', require('./routes/index'));


// 404 HANDLER
app.use( (req, res, next) => {
  res.status(404).render('404');
});

// APP START
app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
