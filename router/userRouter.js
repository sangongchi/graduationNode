const express = require('express');
const router = express.Router();
const User = require('../db/model/userModel');
const mongoApi = require('../db/api');

const looger = require('morgan'); //日志记录模块引入
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  let { userName, password } = req.body;
  console.log(userName);
  const user = await User.findOne({ userName: userName });
  console.log(user);
  if (!user) {
    res.send({ err: 1, message: '用户名不存在' });
  } else {
    const isPassword = bcrypt.compareSync(password, user.password);
    if (!isPassword) {
      res.send({ err: 1, message: '密码无效' });
    } else {
      res.send({ err: 0, message: '登录成功' });
    }
  }
});
router.post('/register', (req, res) => {
  let { userName, password } = req.body.params;
  mongoApi
    .findOne(User, { userName: userName })
    .then((res) => {   
      if(res!=null&&res.userName){
        console.log("用户名 已注册")
        // res.send({ err: -1, message: '该用户名已注册，请重新输入' });
      }else{
        bcrypt.genSalt(10, (err, salt) => {
          //对密码进行加密
          bcrypt.hash(password, salt, (err, hash) => {
            let parms = { userName: userName, password: hash };
            const user = mongoApi
              .insert(User, parms)
              .then((result) => {
                console.log("注册成功")
                // res.send({ err: 0, message: '注册成功' });
              })
              .catch((err) => {
                res.send({ err: -1, message: '有问题' });
              });
          });
        });
      }
    })
    .catch((err) => {
      console.log(err)
      res.send({err:-1,message:'数据库操作失败'})
    });
});

module.exports = router;
