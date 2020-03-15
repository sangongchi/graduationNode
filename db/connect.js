const mongoClient=require('mongoose')

let url = "mongodb://127.0.0.1:27017/testLogin";
//连接数据库
mongoClient.connect(url,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})

const db=mongoClient.connection;      //数据库的连接对象

//连接成功
db.on('connected',()=>{
  console.log("Mongoose connect success")
  
})

//连接异常
db.on('error',(err)=>{
  console.log("数据库连接异常"+err)
})

//断开连接
db.on('disconnected',()=>{
  console.log("Mongoose connection disconnected")
})
