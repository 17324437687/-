const express =require('express')
const apiCorse = express.Router({mergeParams:true})
const{ 
    getCourses,
    getCoursesId,
    postCourses,
    UpdateCourses,
    deleteData
 }= require('../routers/Course')
  //  导入按条件查询中间件
  const advancedResultr = require('../config/advancedResults')
  const Courses =require('../models/Courses')

 apiCorse.route("/").get(advancedResultr(Courses,"mscamp"),getCourses).post(postCourses)
 apiCorse.route('/:id').get(getCoursesId).put(UpdateCourses).delete(deleteData)

module.exports=apiCorse
