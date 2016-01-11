'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');
var routes = require('./routes/routes');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '/public')});
});

app.use('/annotations', routes.annotations);
app.use('/documents', routes.documents);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.sendFile('404.html', {root: path.join(__dirname, '/public')});
});

app.listen(port);

console.log('Server started at http://localhost:' + port);
