/**
 * 定义数据模型
 */
const mongoose = require('mongoose')

const MscampSchema = new mongoose.Schema({
   name:{type:String},
   descriptio:{type:String},
   phone:{type:String},
   email:{type:String},
   address:{type:String},
   careers:{type:[String]},
   online:{type:Boolean},
   averageCost:{type:Number}
})

    module.exports = mongoose.model('Mscamp',MscampSchema)