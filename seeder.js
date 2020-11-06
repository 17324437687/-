const fs = require("fs")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config({
    pahe:"./config/config.env"
})
//引入模型
const Mscamp =require("./models/Mscamp")

// 链接数据库
 mongoose.connect("mongodb://test:test1234@ds123753.mlab.com:23753/ms-interface-api1",{
   useNewUrlParser:true,
   useUnifiedTopology: true,
   useCreateIndex:true,
   useFindAndModify:false
})

//读取本地数据
const mscamps = JSON.parse(fs.readFileSync(`${__dirname}/db/mscamps.json`,"utf-8"))

// 导入数据
const importDate =async ()=>{
   try{
       await Mscamp.create(mscamps)
       console.log('数据存储成功');
   }catch(error){
       console.log(error);
   }
}

//删除数据库
const deleteData = async () => {
     try{
       await Mscamp.deleteMany()
       console.log('数据删除成功');
   }catch(error){
       console.log(error);
   }
}
if(process.argv[2]=="-i"){
    importDate()
}else if(process.argv[2] =="-d"){
    deleteData()
}
