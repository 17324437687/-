const express = require("express");
const connectDB = require('./config/db')
const apiRouter = require('./routers/mscamps')
const ErrorResponse = require('./utils/error')
const morgan = require('morgan')
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

// error 报错
app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(ErrorResponse.statusCode).json({success:false,error:err.message})
})

// mongodb数据库
connectDB();

//创建打印中间件
app.use(morgan("dev"))

//监听端口号
app.listen(PORT,()=>{
    console.log(`服务启动${process.env.NODE_ENV}: ${PORT}`);
}) 

process.on('uncaughtException',(err,promise)=>{
    console.log(`Err${err.message}`);
})