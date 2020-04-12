const mongoClient = require('mongoose');

//建立用户表
const fileSchema = new mongoClient.Schema({
  userId: {
    type: String,
  },
  fileName: {
    type: String,
  },
  fileDesr: {
    type: String,
  },
  classType: {
    type: Number,
  },
  className: {
    type: String,
  },
  fileSrc: {
    type: String,
  },
});
//将schema 转化为用户数据模型
const File = mongoClient.model('fileInfo', fileSchema);

//将数据模型抛出
module.exports = File;
