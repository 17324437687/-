const express = require("express");
const connectDB = require('./config/db')
const apiRouter = require('./utils/mscamps')
const apiCourse = require('./utils/Course')

//配置环境变量
const dotenv = require('dotenv')
dotenv.config({
    path:'./config/config.env'
})
const app = express();


// 配置解析
app.use(express.json())

const PORT = process.env.PORT || 3000

//挂着路由节点
app.use('/api/v1/mscamps/',apiRouter);
app.use('/api/v1/cousres/',apiCourse)

// mongodb数据库
connectDB();


//监听端口号
app.listen(PORT,()=>{
    console.log(`服务启动${process.env.NODE_ENV}: ${PORT}`);
}) 

process.on('uncaughtException',(err,promise)=>{
    console.log(`Err${err.message}`);
})