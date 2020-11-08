
/**
 * 引入模型 创建API路由
 * @param GET 所有课程数据 /api/vi/cousres
 * @param GET 根据 ID获取课程  /api/vi/mscamps/:mscampId/cousres
 * @param 
 */
    const Courses = require('../models/Courses')

    exports.getCourses = async (req,res,next)=>{
    let query;
    if(req.params.mscampId){
       query = Courses.find({mscamp:req.params.mscampId})
       return res.status(200).json({sucess:true,data:query})
    }else{
        res.status(200).json(res.advancedResultr)
    } 
    // const courses = await query
    // res.status(200).json({sucess:true,data:courses})
    }
    
    //根据 ID 获取数据
    exports.getCoursesId =async (req,res,next)=>{
        try{
           const CoursesId = await Courses.findById(req.params.id)
        res.status(200).json({sucess:true,data:CoursesId})
        }catch(error){
            res.status(400).json({sucess:false,data:"获取信息失败"})
        }
       
    }
    
    // 添加课程
    exports.postCourses = async (req,res,next)=>{
        try{

            const addCourses = await Courses.create(req.body)
        res.status(200).json({sucess:true,data:addCourses})
        }catch(error){
            
            res.status(400).json({sucess:false,data:"获取信息失败"})
        }
        
    }

    // 根据 ID 更新课程数据
    exports.UpdateCourses = async (req,res,next)=>{
        try{
            const UpdateId = await Courses.findByIdAndUpdate(req.params.id,req.body,{
                new:true,runValidators:true
            })
            res.status(200).json({sucess:true,data:UpdateId})
             }
             catch(error){
            res.status(400).json({sucess:false,data:"获取信息失败"})
            }
    }
     // 根据 ID 删除课程数据
    exports.deleteData = async(req,res,next)=>{
         try{
             const deleteCourses = await Courses.findByIdAndDelete(req.params.id)
             res.status(200).json({sucess:true,data:{msg:'删除成功'}})
          }catch(error){
            res.status(400).json({sucess:false,data:{msg:'删除失败'}})
        }
    }