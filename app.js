const express = require('express');
const db = require('./db/connect');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const morgan = require('morgan'); //日志记录模块引入
const cookieParser = require('cookie-parser');
const svgCaptcha = require('svg-captcha');
const app = express(); //创建服务器应用程序

let verifyCode = '';
// 使用 body-parser 中间
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//日志的建立
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('short', { stream: accessLogStream }));

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', '*');
  // res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use(cookieParser(''));
app.use((req, res, next) => {
  // console.log(req.cookies.wxToken);
  next();
});

const userRouter = require('./router/userRouter');
const uploadRouter = require('./router/uploadRouter');
const guidRouter = require('./router/guidsRouter');
const fileRouter = require('./router/fileRouter');
app.use('/user', userRouter); //引入上边的user路由并使用 app.use 进行拦截
app.use('/upload', uploadRouter);
app.use('/guid', guidRouter);
app.use('/seeFile', fileRouter);
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type');
  if (req.method.toLowerCase() == 'options') res.send(200);
  //让options尝试请求快速结束
  else next();
});
app.get('/', function (req, res) {
  res.send({ msg: 'you just sent a GET request, friend' });
});
app.get('/downloadUrl', (req, res) => {
  let downloadUrl='http://192.168.3.129:3000/download?fileHref='+req.query.fileHref
  res.send({err:0,downloadUrl:downloadUrl})
});
app.get('/download', (req, res) => {
  let fileHref='/pei/staticFile'+req.query.fileHref
  res.download(fileHref, (err) => {
    if (err) {
      res.send('文件下载失败');
    }else{
      let downloadUrl='http://192.168.3.129:3000/download?fileHref='+fileHref
      console.log(downloadUrl)
    }
  });
});
app.get('/code/getCodeImg', (req, res) => {
  let option = {
    size: 4,
    ingoreChars: '0o1i',
    nosie: 3,
    height: 27,
    width: 80,
    color: '#333',
  };
  let code = svgCaptcha.create(option);
  //保存在seesion中
  verifyCode = code.text.toLowerCase();
  res.cookie('captcha', code.text.toLowerCase());
  res.setHeader('Content-Type', 'image/svg+xml');
  res.write(String(code.data));
  res.end();
});
app.post('/verifyCode', (req, res, next) => {
  let code = req.body.code.toLowerCase();
  if (code == verifyCode) {
    res.send({
      err: 0,
      msg: 'code校验成功',
    });
  } else {
    res.send({
      err: '1',
      msg: '验证码输入不正确请重新输入',
    });
  }
});

//捕获错误
app.use((err, req, res, next) => {
  res.send(err.toString());
});

app.listen(3000, () => {
  console.log('app is listen on part 3000');
});
