const mongoClient = require('mongoose');

//建立用户表
const fileSchema = new mongoClient.Schema({
  userId: {
    type: String,
  },
  fileName: {
    type: String,
  },
  fileSrc: {
    type: String,
  },
  classType: {
    type: Number,
  },
  fileDesr: {
    type: String,
  },
});

//将schema 转化为用户数据模型
const File = mongoClient.model('totalFile', fileSchema);

//将数据模型抛出
module.exports = File;
