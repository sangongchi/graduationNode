const express =require('express')
const router=express.Router()
const User =require('../db/model/userModel')


const looger=require('morgan')   //日志记录模块引入
const bcrypt = require('bcrypt')

router.post('/login',async (req,res)=>{
  let {username,password}=req.body
  const user=await User.findOne({username:username})
  if(!user){
    res.send({message:"用户名不存在"})
  }
  else{
    const isPassword=bcrypt.compareSync(password, user.password)
    if(!isPassword){
      res.send({message:"密码无效"})
    }
    else{
      res.send({user})
    }
  }
})
router.post('/register',async(req,res)=>{
  let {username,password}=req.body
  const isUserHas=await User.findOne({username:username})
  if(isUserHas){
    res.send({message:"该用户名已注册，请重新输入"})
  }
  else{
    bcrypt.genSalt(10,(err,salt)=>{  //对密码进行加密
      bcrypt.hash(password,salt,(err,hash)=>{
        const user= User.create({
          username:username,
          password:hash
        },(err,data)=>{
          if(err) throw err
          console.log("注册成功")
          res.send({message:'注册成功'})
        })
      })
    })
  }

})

module.exports=router