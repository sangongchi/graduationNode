<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const mongoApi = require('../db/api');

const seeFileModel =require('../db/model/fileModel')
const looger = require('morgan'); //日志记录模块引入

router.post('/ImageData', (req, res) => {
  let params = {
    classType: 2,
    imgType:req.body.imgType?req.body.imgType:''
  };
  if(params.imgType==''){
    delete params.imgType
  }
  console.log(params)
  mongoApi
    .find(seeFileModel, params)
    .then((data) => {
      console.log("step 2")
      if(data.length==0){
        res.send({message:'no file',err:'-1'})
      }else{
        res.send({ message: '读取图片信息成功', err: '0', imgArr: data });
      }
    })
    .catch((err) => {
      res.send({ message: '信息读取失败', err: '-1' });
    });
});
router.post('/VideoData', (req, res) => {
  let params = {
    classType:3
  };
  mongoApi
    .find(seeFileModel, params)
    .then((data) => {
      if(data.length==0){
        res.send({message:'no file',err:'-1'})
      }else{
        res.send({ message: 'video read success', err: '0', fileArr: data });
      }
    })
    .catch((err) => {
      res.send({ message: '文件读取失败', err: '-1' });
    });
});
router.post('/FileData', (req, res) => {
  let params = {
    classType:1
  };
  mongoApi
    .find(seeFileModel, params)
    .then((data) => {
      if(data.length==0){
        res.send({message:'no file',err:'-1'})
      }else{
        res.send({ message: '文件读取成功', err: '0', fileArr: data });
      }
    })
    .catch((err) => {
      res.send({ message: '文件读取失败', err: '-1' });
    });
});
module.exports = router;
=======
const express = require('express');
const router = express.Router();
const mongoApi = require('../db/api');

const seeFileModel =require('../db/model/fileModel')
const looger = require('morgan'); //日志记录模块引入

router.post('/ImageData', (req, res) => {
  let params = {
    classType: 2,
    imgType:req.body.imgType?req.body.imgType:''
  };
  if(params.imgType==''){
    delete params.imgType
  }
  console.log(params)
  mongoApi
    .find(seeFileModel, params)
    .then((data) => {
      console.log("step 2")
      if(data.length==0){
        res.send({message:'no file',err:'-1'})
      }else{
        res.send({ message: '读取图片信息成功', err: '0', imgArr: data });
      }
    })
    .catch((err) => {
      res.send({ message: '信息读取失败', err: '-1' });
    });
});
router.post('/VideoData', (req, res) => {
  let params = {
    classType:3
  };
  mongoApi
    .find(seeFileModel, params)
    .then((data) => {
      if(data.length==0){
        res.send({message:'no file',err:'-1'})
      }else{
        res.send({ message: 'video read success', err: '0', fileArr: data });
      }
    })
    .catch((err) => {
      res.send({ message: '文件读取失败', err: '-1' });
    });
});
router.post('/FileData', (req, res) => {
  let params = {
    classType:1
  };
  mongoApi
    .find(seeFileModel, params)
    .then((data) => {
      if(data.length==0){
        res.send({message:'no file',err:'-1'})
      }else{
        res.send({ message: '文件读取成功', err: '0', fileArr: data });
      }
    })
    .catch((err) => {
      res.send({ message: '文件读取失败', err: '-1' });
    });
});
module.exports = router;
>>>>>>> e468a6b2922e139a5baee7ded901bdd72b759f80
