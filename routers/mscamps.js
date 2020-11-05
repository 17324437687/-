const exprress =require('express')
const apiRouter = exprress();
const {
getMscamps,
createMscamps,
getMscampsId,
putMscamps,
deleteMscamps
} = require('./myRoters')

apiRouter.route('/').get(getMscamps).post(createMscamps)

apiRouter.route('/:id').get(getMscampsId).put(putMscamps).delete(deleteMscamps)

module.exports=apiRouter
