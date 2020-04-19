const { Task } = require("../models/index")

module.exports = (req, res, next) => {
    Task.findOne({
        where: {
            'id': req.params.id
        }
    }).then(result => {
        if (result) {
            if(result.ProjectId=== req.currentProjectId){
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
    }).catch(err => {
        // console.log(err)
        next(err)
    })

}