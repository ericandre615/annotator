'use strict';

var annotations = require('./annotations');
var documents = require('./documents');

var routes = {
  annotations: annotations,
  documents: documents
};

module.exports = routes;
