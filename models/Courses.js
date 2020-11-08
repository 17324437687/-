const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema({
     title: {
    type: String,
   
  },
  description: {
    type: String,
   
  },
  weeks: {
    type: String,
    
  },
  tuition: {
    type: String,
   
  },
  minimumSkill: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  mscamp: {
    type: mongoose.Schema.ObjectId,
  },
  user: {
    type: mongoose.Schema.ObjectId,
  },
})
module.exports = mongoose.model("Course",CourseSchema)