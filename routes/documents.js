var express = require('express');
var router = express.Router();

router.get('/:doc_id', function(req, res) {
  var doc_id = req.params.doc_id;
  res.set('Content-Type', 'text/plain');
  res.sendFile(doc_id, {root: process.cwd() + '/docs'}); 
});

module.exports = router;
