<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const multer = require('multer');
const multiparty = require('multiparty');
const path = require('path');
const mongoApi = require('../db/api');
const imgFileModel = require('../db/model/uploadImgModel');
const fileModel = require('../db/model/uploadFileModel');
const videoModel=require('../db/model/uploadVideoModel')
const  totalFileModel=require('../db/model/fileModel')

var storage = multer.diskStorage({
  //设置文件上传后的路径，uploads文件会自动创建
  destination: (req, file, cb) => {
    if (req.route.path == '/video') {
      cb(null, '/pei/staticFile/video');
    } else if(req.route.path=="/img"){
      cb(null, '/pei/staticFile/img');
    }else{
      cb(null,'/pei/staticFile/file')
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
      originalname:req.file.originalname,
      fileName: req.file.filename,
      fileSrc: `http://192.168.3.129:9999/img/${req.file.filename}`,
    };
    mongoApi
      .save(imgFileModel, params)
      .then((result) => {
        res.send({
          err: 0,
          msg: '文件上传成功',
          originalname:req.file.originalname,
          url: `http://192.168.3.129:9999/img/${req.file.filename}`,
        });
      })
      .catch((err) => {
        res.send({ err: -1, message: err });
      });
  }
});
router.post('/file', upload.single('file'), (req, res) => {
  let { size, path } = req.file;
  if (size > 5000000000000) {
    return res.send({ err: '-1', msg: '文件上传尺寸过大' });
  } else {
    let params={
      originalname:req.file.originalname,
      fileName: req.file.filename,
      fileSrc: `http://192.168.3.129:9999/file/${req.file.filename}`,
    }
    mongoApi.save(fileModel,params).then(result=>{
      res.send({
        err: 0,
        msg: '文件上传成功',
        originalname:req.file.originalname,
        url: `http://192.168.3.129:9999/file/${req.file.filename}`,
      });
    }).catch(err=>{
      res.send({err:1,message:'have question'})
    })
  }
});
router.post('/video',upload.single('file'),  (req, res) => {
  let { size, path } = req.file;
  if (size > 50000000000) {
    return res.send({ err: '-1', msg: '文件上传尺寸过大' });
  } else {
    let params={
      originalname:req.file.originalname,
      fileName: req.file.originalname,
      fileSrc: `http://192.168.3.129:9999/video/${req.file.filename}`,
    }
    mongoApi.save(videoModel,params).then(result=>{
      res.send({
        err: 0,
        msg: '文件上传成功',
        originalname:req.file.originalname,
        url: `http://192.168.3.129:9999/video/${req.file.filename}`,
      });
    }).catch(err=>{
      res.send({err:1,message:'have question'})
    })
  }
});
router.post('/upfile', (req, res) => {
  let params={
    userId:req.body.userId,
    fileName:req.body.fileName,
    fileDesr:req.body.fileDesrc,
    originalname:req.body.originalname,
    fileSrc:req.body.fileSrc,
    imgSrc:req.body.imgSrc?req.body.imgSrc:'',
    classType:req.body.classType,
    imgType:'1'
  }
  if(req.body||req.body.imgType){
    params.imgType=req.body.imgType
  }
  console.log(params)
  mongoApi.save(totalFileModel,params).then(result=>{
    res.send({
      err: 0,
      msg: '文件上传成功',
    });
  }).catch(err=>{
    res.send({err:1,message:'have question'})
  })
});
module.exports = router;
=======
const express = require('express');
const router = express.Router();
const multer = require('multer');
const multiparty = require('multiparty');
const path = require('path');
const mongoApi = require('../db/api');
const imgFileModel = require('../db/model/uploadImgModel');
const fileModel = require('../db/model/uploadFileModel');
const videoModel=require('../db/model/uploadVideoModel')
const  totalFileModel=require('../db/model/fileModel')

var storage = multer.diskStorage({
  //设置文件上传后的路径，uploads文件会自动创建
  destination: (req, file, cb) => {
    if (req.route.path == '/video') {
      cb(null, '/pei/staticFile/video');
    } else if(req.route.path=="/img"){
      cb(null, '/pei/staticFile/img');
    }else{
      cb(null,'/pei/staticFile/file')
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
      originalname:req.file.originalname,
      fileName: req.file.filename,
      fileSrc: `http://192.168.3.129:9999/img/${req.file.filename}`,
    };
    mongoApi
      .save(imgFileModel, params)
      .then((result) => {
        res.send({
          err: 0,
          msg: '文件上传成功',
          originalname:req.file.originalname,
          url: `http://192.168.3.129:9999/img/${req.file.filename}`,
        });
      })
      .catch((err) => {
        res.send({ err: -1, message: err });
      });
  }
});
router.post('/file', upload.single('file'), (req, res) => {
  let { size, path } = req.file;
  if (size > 5000000000000) {
    return res.send({ err: '-1', msg: '文件上传尺寸过大' });
  } else {
    let params={
      originalname:req.file.originalname,
      fileName: req.file.filename,
      fileSrc: `http://192.168.3.129:9999/file/${req.file.filename}`,
    }
    mongoApi.save(fileModel,params).then(result=>{
      res.send({
        err: 0,
        msg: '文件上传成功',
        originalname:req.file.originalname,
        url: `http://192.168.3.129:9999/file/${req.file.filename}`,
      });
    }).catch(err=>{
      res.send({err:1,message:'have question'})
    })
  }
});
router.post('/video',upload.single('file'),  (req, res) => {
  let { size, path } = req.file;
  if (size > 50000000000) {
    return res.send({ err: '-1', msg: '文件上传尺寸过大' });
  } else {
    let params={
      originalname:req.file.originalname,
      fileName: req.file.originalname,
      fileSrc: `http://192.168.3.129:9999/video/${req.file.filename}`,
    }
    mongoApi.save(videoModel,params).then(result=>{
      res.send({
        err: 0,
        msg: '文件上传成功',
        originalname:req.file.originalname,
        url: `http://192.168.3.129:9999/video/${req.file.filename}`,
      });
    }).catch(err=>{
      res.send({err:1,message:'have question'})
    })
  }
});
router.post('/upfile', (req, res) => {
  let params={
    userId:req.body.userId,
    fileName:req.body.fileName,
    fileDesr:req.body.fileDesrc,
    originalname:req.body.originalname,
    fileSrc:req.body.fileSrc,
    imgSrc:req.body.imgSrc?req.body.imgSrc:'',
    classType:req.body.classType,
    imgType:'1'
  }
  console.log(params)
  mongoApi.save(totalFileModel,params).then(result=>{
    res.send({
      err: 0,
      msg: '文件上传成功',
    });
  }).catch(err=>{
    res.send({err:1,message:'have question'})
  })
});
module.exports = router;
>>>>>>> e468a6b2922e139a5baee7ded901bdd72b759f80
