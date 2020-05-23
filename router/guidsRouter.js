const express = require('express');
const router = express.Router();
const mongoApi = require('../db/api');

const looger = require('morgan'); //日志记录模块引入

router.post('/guidSystems', async (req, res) => {
  res.send({ message: '获取系统列表信息成功', err: '-1' });
});
module.exports = router;
