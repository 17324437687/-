const fs = require('fs')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config({
    path:'./config/config.env'
})
const Mscamp =require('./models/Mscamp')
const Courses = require('./models/Courses')
mongoose.connect(process.env.NET_MONGO_URL,{
   useNewUrlParser:true,
   useUnifiedTopology: true,
   useCreateIndex:true,
   useFindAndModify:false
})

//读取本地数据 
const mscamps = JSON.parse(fs.readFileSync(`${__dirname}/db/mscamps.json`,'utf-8'))
const Gcourses = JSON.parse(fs.readFileSync(`${__dirname}/db/courses.json`,'utf-8'))
const importData = async ()=>{
    try{
       await  Mscamp.create(mscamps)
       await Courses.create(Gcourses)
      console.log('存储成功');
      process.exit//退出服务
    }catch(error){
      console.log("导入失败")
    }
}

const deleteData = async ()=>{
      try{
      await  Mscamp.deleteMany()
      await Courses.deleteMany()
      console.log('删除成功');
      process.exit//退出服务
    }catch(error){
      console.log("删除失败")
    }
}
if(process.argv[2]=="-i")return importData()
if(process.argv[2]=="-b")return deleteData()
