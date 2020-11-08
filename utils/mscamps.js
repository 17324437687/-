const express =require('express')
const apiRouter = express.Router();

const {
getMscamps,
createMscamps,
getMscampsId,
putMscamps,
deleteMscamps
} = require("../routers/myRoters");
const advancedResultr = require('../config/advancedResults')
const Mscamp =require('../models/Mscamp')
// 路由重定向
const Course =require('./Course')
apiRouter.use('/:mscampId/cousres',Course)

apiRouter.route('/').get(advancedResultr(Mscamp,"courses"),getMscamps).post(createMscamps)
apiRouter.route('/:id').get(getMscampsId).put(putMscamps).delete(deleteMscamps)

module.exports=apiRouter
