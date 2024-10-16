var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/views/index.html');
});

/* user registration */
router.get('/user', function(req, res, next) {
  // 파일을 보여주기위해 sendFile 사용
  res.sendFile(__dirname + '/views/user.html');
});

/* user list */
router.get('/users', function(req, res, next) {
  // 파일을 보여주기위해 sendFile 사용
  res.sendFile(__dirname + '/views/users.html');
});

/* product registration */
router.get('/product', function(req, res, next) {
  // 파일을 보여주기위해 sendFile 사용
  res.sendFile(__dirname + '/views/product.html');
});

/* product list */
router.get('/products', function(req, res, next) {
  // 파일을 보여주기위해 sendFile 사용
  res.sendFile(__dirname + '/views/products.html');
});

module.exports = router;
