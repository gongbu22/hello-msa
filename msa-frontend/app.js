let createError = require('http-errors');
let express = require('express');
let path = require('path');
// nodejs에서 제공하는 세션관리 패키지
let session = require('express-session');
// 환경변수 설정을 위해 템플릿 엔진 지정
const handlebars = require('express-handlebars');

let port = 3000;

let indexRouter = require('./public/index');
let naverRouter = require('./public/naver');

let app = express();

// handlebars 설정
const hbs = handlebars.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'public/handlebars'));

// session 설정
// resave, saveUninitialized - 로그인하지 않은 클라이언트의 세션은 저장 X
app.use(session({
  secret: 'Hello, World!!',  // 세션 데이터 암호화시 사용하는 비밀키
  resave: false,  // 세션 데이터 수정시 재저장 여부
  saveUninitialized: false  // 세션 초기화 관련 설정, 사용자가 세션을 실제로 사용할 때만 세션이 저장되도록 함
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', naverRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 서버 시작
app.listen(port, () => {
  console.log(`frontend server on port ${port}`)
})

module.exports = app;
