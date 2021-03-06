const express = require('express');
const router = express.Router();
const mongoApi = require('../db/api');

const looger = require('morgan'); //日志记录模块引入

router.post('/guidSystems', async (req, res) => {
  let systems = [
    {
      ImgSrc:
      'http://sangongchi.top:9999/img/top1.png',
      identify: 'name',
      id: 'id',
      resPath: '/#/home',
      resName: '作业管理系统',
    },
    {
      ImgSrc:
      'http://sangongchi.top:9999/img/top2.png',
      identify: 'name',
      id: 'id',
      resPath: 'http://sangongchi.top:8008',
      resName: '博客平台',
    },
    {
      ImgSrc:
        'http://sangongchi.top:9999/img/top4.png',
      identify: 'name',
      id: 'id',
      resPath: 'http://sangongchi.top:7300',
      resName: 'easyMock平台',
    },
    {
      ImgSrc:
      'http://sangongchi.top:9999/img/top3.png',
      identify: 'name',
      id: 'id',
      resPath: 'http://sangongchi.top:8080',
      resName: 'jenkins自动化构建平台',
    },
  ];
  res.send({ message: '获取系统列表信息成功', err: '-1', systems: systems });
});
module.exports = router;
