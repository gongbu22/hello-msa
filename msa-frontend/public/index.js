var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.json({msg: "Hello, World!!"})
  // html코드를 보여주기위해 res.send 사용
  res.send('<h1>Hello, World!!</h1>' +
    '<div><a href="/user">회원가입</a></div>' +
    '<div><a href="/product">상품등록</a></div>');
});

/* user registration */
router.get('/user', function(req, res, next) {
  // 파일을 보여주기위해 sendFile 사용
  res.sendFile(__dirname + '/views/user.html');
});

/* product registration */
router.get('/product', function(req, res, next) {
  // 파일을 보여주기위해 sendFile 사용
  res.sendFile(__dirname + '/views/product.html');
});

module.exports = router;
