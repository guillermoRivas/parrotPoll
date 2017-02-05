var express = require('express');
var router = express.Router();

/* Pagina principal */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Parrot poll' });
});

module.exports = router;
