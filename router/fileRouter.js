const express = require('express');
const router = express.Router();
const mongoApi = require('../db/api');
const seeImageModel = require('../db/model/uploadModel');
const seeFileModel = require('../db/model/upload');

const looger = require('morgan'); //日志记录模块引入

router.post('/ImageData', (req, res) => {
  let params = {
    classType: req.body.classType ? req.body.classType : '',
  };
  if (params.classType == '') {
    delete params.classType;
  }
  mongoApi
    .find(seeImageModel, params)
    .then((data) => {
      res.send({ message: '读取图片信息成功', err: '0', imgArr: data });
    })
    .catch((err) => {
      res.send({ message: '信息读取失败', err: '-1' });
    });
});
router.post('/FileData', (req, res) => {
  let params = {};
  if (params.classType == '') {
    delete params.classType;
  }
  mongoApi
    .find(seeFileModel, params)
    .then((data) => {
      res.send({ message: '文件读取成功', err: '0', fileArr: data });
    })
    .catch((err) => {
      res.send({ message: '文件读取失败', err: '-1' });
    });
});
module.exports = router;
