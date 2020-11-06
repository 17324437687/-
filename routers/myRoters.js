// 引入模型
const Mscamp = require('../models/Mscamp')
exports.getMscamps = async (req,res,next)=>{
    try{ //find 获取全部数据
        let query;
        const reqQuery ={...req.query}
        //处理关键字
         const removeFields = ["select","sort","page","linit"]
         //清除关键字和值
         removeFields.forEach((params)=>{
             delete reqQuery[params]
         })

         let queryStr = JSON.stringify(reqQuery)
         queryStr.repeat(/\b(gt|gte|lt|lte|in)\b/g,(match)=>`$${match}`)
         query = Mscamp.find(JSON.parse(queryStr))
         

        //  按条件获取内容
        if(req.query.select){
           const fields = req.query.select.split(",").join(" ")
          query = query.select(fields)
        }

        
        //sort 排序
        if(req.query.sort){
            const sortBy = req.query.select.sort(",").join(" ")
            query = query.sort(sortBy);
        }else {
            query = query.sort("averageCost")
        }
        
        //分页获取
       
        const page = parseInt(req.query.page,10)|| 1;
        const linit = parseInt(req.query.linit,10)||2;
        const startIndex = (page - 1) * linit;
        const endIndex = page*linit
        const total = await Mscamp.countDocuments(); //查找总条数 
        query.skip(startIndex).limit(linit) //获取分页的方法

        const mscamp = await query
        //分页的返回值
        let pages ={}
        if(startIndex>0){
          pages.prev = {page:page -1,linit}
        }
         if(endIndex<total){
          pages.next = {page:page +1,linit}
        }
        res.status(200).json({sucess:true,count:mscamp.length,pages,data:mscamp})
    }catch(error){
         res.status(400).json({sucess:true,error:error})
    }
    
}

exports.getMscampsId= async(req,res,next)=>{
     
    try{ // findById 根据 ID 获取单个数据
     const mscamp = await Mscamp.findById(req.params.id)
     res.status(200).json({sucess:true,data:mscamp})
    }catch(error){
      res.status(400).json({sucess:false,error:error})
    }
}


exports.createMscamps = async (req,res,next)=>{
    try{// create 添加数据
      const mscamp = await Mscamp.create(req.body)
      res.status(200).json({sucess:true,data:mscamp})
    }catch(error){
     res.status(400).json({sucess:false,error:error})
    }
   
}

exports.putMscamps = async (req,res,next)=>{
    try{
        //findByIdAndUpdate() 根据 ID 更新单个数据 
        //req.body 你要更新什么内容 
        //new 更新返回的数据
        //runValidators 更新的数据要不要验证
       const mscamp = await Mscamp.findByIdAndUpdate(req.params.id,req.body,{
         new:true,
         runValidators:true
       }) 
        res.status(200).json({sucess:true,data:mscamp})
    }catch(error){
        res.status(400).json({sucess:true,error:error})
    }
    
}

exports.deleteMscamps = async (req,res,next)=>{

      try{
        //findByIdAndDelete() 根据 ID 删除单个数据 
       const mscamp = await Mscamp.findByIdAndDelete(req.params.id) 
        res.status(200).json({sucess:true,data:{msg:'删除成功'}})

    }catch(error){
        res.status(400).json({sucess:true,error:error})
    }
}
