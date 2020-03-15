const express = require('express');
const db = require('./db/connect');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const morgan = require('morgan'); //日志记录模块引入
const cookieParser = require('cookie-parser');
const multer = require('multer');
const app = express(); //创建服务器应用程序

// 使用 body-parser 中间
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//日志的建立
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('short', { stream: accessLogStream }));

//设置允许跨域访问该服务.
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  // res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use(cookieParser('CCCC'));
app.use((req, res, next) => {
  // console.log(req.cookies.wxToken);
  next();
});

const userRouter = require('./router/userRouter');
const uploadRouter = require('./router/uploadRouter');
app.use('/user', userRouter); //引入上边的user路由并使用 app.use 进行拦截
app.use('/upload', uploadRouter);

app.get('/', function(req, res) {
  res.send({ msg: 'you just sent a GET request, friend' });
});
app.get('/download', (req, res) => {
  console.log(req.query);
  if (req.query.name == 'img') {
    fileName = './uploads/1583337027448.png';
  } else {
    fileName = '../flutter——pdf/10.Flutter 页面布局 页面布局Wrap组件.pdf';
  }
  res.download(fileName, err => {
    if (err) {
      res.send('文件下载失败');
    }
  });
});

//捕获错误
app.use((err, req, res, next) => {
  res.send(err.toString());
});

app.listen(3000, () => {
  console.log('app is listen on part 3000');
});
