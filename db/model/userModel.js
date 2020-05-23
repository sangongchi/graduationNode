const mongoClient = require('mongoose');
//建立用户表
const UserSchema = new mongoClient.Schema({
  userName: {
    type: String,
    unique:true
  },
  password: {
    type: String,
  },
});

//将schema转化为用户数据模型
const User = mongoClient.model('user', UserSchema); //集合名、schema对象 将集合和schema对象关联
//将数据模型抛出
module.exports = User;
