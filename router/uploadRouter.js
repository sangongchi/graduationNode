const express = require('express');
const router = express.Router();
const multer = require('multer');
const multiparty = require('multiparty');
const path = require('path');
const mongoApi = require('../db/api');
const FileModel = require('../db/model/uploadModel');
const FileInfoModel = require('../db/model/upload');

var storage = multer.diskStorage({
  //设置文件上传后的路径，uploads文件会自动创建
  destination: (req, file, cb) => {
    if (req.route.path == '/file') {
      cb(null, 'H:/_myResult/upload/file');
    } else {
      cb(null, 'H:/_myResult/upload/img');
    }
  },
  //文件过滤函数
  filtFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    let extArr = ['.jpg', '.jpeg', '.gif', '.png'];
    if (!extArr.includes(ext)) {
      cb(new Error('上传文件类型有问题'));
    }
    cb(null, true);
  },

  // 给文件重命名，获取添加后缀名
  filename: (req, file, cb) => {
    var fileFormat = file.originalname.split('.');
    //上述方法对文件的原始名称进行切割
    //为文件添加时间戳防止文件重名
    cb(null, Date.parse(new Date()) + parseInt(Math.random() * 9999) + '.' + fileFormat[fileFormat.length - 1]);
  },
});
var upload = multer({
  storage: storage,
});

router.post('/img', upload.single('file'), (req, res) => {
  let { size, mimetype, path } = req.file;
  let types = ['jpg', 'jpeg', 'png'];
  let tmpType = mimetype.split('/')[mimetype.split('/').length - 1];
  if (size > 500000) {
    return res.send({ err: '-1', msg: '文件上传尺寸过大' });
  } else if (!types.includes(tmpType)) {
    return res.send({ err: '-2', msg: '文件类型上传有误' });
  } else {
    let params = {
      fileName: req.file.filename,
      fileSrc: `http:127.0.0.1/public/img/${req.file.filename}`,
    };
    mongoApi
      .save(FileModel, params)
      .then((result) => {
        console.log(FileModel);
        res.send({
          err: 0,
          msg: '文件上传成功',
          fileName: req.file.filename,
          url: `http:127.0.0.1/public/img/${req.file.filename}`,
        });
      })
      .catch((err) => {
        res.send({ err: 1, msg: err });
      });
  }
});
router.post('/file', upload.single('file'), (req, res) => {
  let { size, mimetype, path } = req.file;
  let types = ['jpg', 'jpeg', 'png'];
  let tmpType = mimetype.split('/')[mimetype.split('/').length - 1];
  if (size > 50000000) {
    return res.send({ err: '-1', msg: '文件上传尺寸过大' });
  } else if (types.includes(tmpType)) {
    return res.send({ err: '-2', msg: '文件类型上传有误' });
  } else {
    res.send({
      err: 0,
      msg: '文件上传成功',
      url: `http:127.0.0.1/H:/_myResult/upload/${req.file.filename}`,
    });
  }
});
router.post('/info', (req, res) => {
  if (req.body) {
    let params = req.body;
    mongoApi.save(FileInfoModel, params).then((res) => {
      res.send({
        err: 0,
        msg: '文件上传成功',
      });
    });
  }
});
module.exports = router;
