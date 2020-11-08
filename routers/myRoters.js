// 引入模型 创建API路由
const Mscamp = require('../models/Mscamp')

exports.getMscamps = async (req,res,next)=>{
    try{ //find 获取全部数据
      
        res.status(200).json(res.advancedResultr)
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
       const mscamp = await Mscamp.findById(req.params.id) 
       mscamp.remove()
        res.status(200).json({sucess:true,data:{msg:'删除成功'}})

    }catch(error){
        res.status(400).json({sucess:true,error:error})
    }
}
