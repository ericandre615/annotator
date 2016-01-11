var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js');
var parser = new xml2js.Parser({
      explicitArray: false,
      attrkey: 'attr',
      charkey: 'text'
    });

router.get('/', function(req, res) {
  fs.readFile(process.cwd() + '/annotations/ch08.txt.xml', function(err, file) {
    if(err) {
      console.log(err);
      throw new Error(err);
    }
    parser.parseString(file, function(err, data) {
      if(err) {
        console.log(err);
        throw new Error(err);
      }
      res.send(data);
    });
  });
});

module.exports = router;
