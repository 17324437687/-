const Mscamp = require("../models/Mscamp");

// 高级查询条件
const advancedResultr = (model,populate)=>async(req,res,next)=>{
    
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
         query = model.find(JSON.parse(queryStr))
         

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
        const linit = parseInt(req.query.linit,10)||7;
        const startIndex = (page - 1) * linit;
        const endIndex = page*linit
        const total = await model.countDocuments(); //查找总条数 
        query.skip(startIndex).limit(linit) //获取分页的方法

        
        //是否关联
        if(populate){
            query = query.populate(populate)
        }
         const results = await query
        //分页的返回值
        let pages ={}
        if(startIndex>0){
          pages.prev = {page:page -1,linit}
        }
         if(endIndex<total){
          pages.next = {page:page +1,linit}
       
          }
            res.advancedResultr = {
             sucess:true,
             count:results.length,
             pages,
             data:results
         }
         next()
         
}
module.exports = advancedResultr