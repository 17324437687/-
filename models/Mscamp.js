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
   averageCost:{type:Number},
},{
   toJSON:{virtuals:true},
   toObject:{virtuals:true}
})
// 配置virtuals
MscampSchema.virtual("courses",{
   ref:"Course",
   localField:'_id',
   foreignField:'mscamp',
   justOne:false
})

//配置mongodb置钩子
MscampSchema.pre("remove",async function(next){
   await this.model('Course').deleteMany({mscamp:this._id})
next()
})
    module.exports = mongoose.model('Mscamp',MscampSchema)