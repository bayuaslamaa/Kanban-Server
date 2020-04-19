const { Project } = require("../models/index")


module.exports = (req, res, next) => {
    Project.findOne({
        where: {
            'id': req.params.id
        }
    }).then(result => {
        if (result) {
            if(result.UserId=== req.currentUserId){
                req.currentProjectId = result.id
                return next()
            }else{
                return next({
                    name: 'Unauthorized'
                })
            }
        } else {
            return next({
                name: 'Unauthorized'
            })
        }
    }).catch(err => next(err))

}