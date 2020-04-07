const mongoClient=require('mongoose')

//建立用户表
const fileSchema=new mongoClient.Schema({
  id:{
    unique:true,
    type:String
  },
  fileName:{
    type:String
  },
  fileType:{
    type:Array
  },
  fileDescr:{
    type:String
  },
  fileSrc:{
    type:String
  }
})

//将schema 转化为用户数据模型
const File =mongoClient.model('file',fileSchema)

//将数据模型抛出
module.exports=File