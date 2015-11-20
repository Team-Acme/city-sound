var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', {
    title: 'Bands From Here'
  });
});

router.get('/logout', function(req, res, next) {
  console.log('***********************');
  res.render('main', {
    title: 'Bands From Here'
  });
});

module.exports = router;