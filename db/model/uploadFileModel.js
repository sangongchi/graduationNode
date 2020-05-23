<<<<<<< HEAD
const mongoClient = require('mongoose');

//建立用户表
const fileSchema = new mongoClient.Schema({
  fileName: {
    type: String,
  },
  fileSrc: {
    type: String,
  },
  originalname:{
    type:String
  }
});
//将schema 转化为用户数据模型
const File = mongoClient.model('detailFile', fileSchema);

//将数据模型抛出
module.exports = File;
=======
const mongoClient = require('mongoose');

//建立用户表
const fileSchema = new mongoClient.Schema({
  fileName: {
    type: String,
  },
  fileSrc: {
    type: String,
  },
  originalname:{
    type:String
  }
});
//将schema 转化为用户数据模型
const File = mongoClient.model('detailFile', fileSchema);

//将数据模型抛出
module.exports = File;
>>>>>>> e468a6b2922e139a5baee7ded901bdd72b759f80
