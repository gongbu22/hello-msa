var express = require('express');
var router = express.Router();

// github 올릴때는 id, secret 제거하고 올리기
var client_id = 'Dz7sIkhaeoxyyZVqw9L6';
var client_secret = 'peKPyjuXLP';
var state = "RANDOM_STATE";
var redirectURI = encodeURI("http://localhost:3000/api/callback");
var api_url = "";

/* naver api login */
router.get('/api/naver', function(req, res, next) {
    api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
});

/* naver api callback */
router.get('/api/callback', function(req, res, next) {
    code = req.query.code;
    state = req.query.state;
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
        + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    var request = require('request');
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

// 다른 외부에서 사용할 수 있게끔 export 하겠다.
module.exports = router;