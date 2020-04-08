const { Project } = require("../models/index")


module.exports = (req, res, next) => {
    Project.findOne({
        where: {
            'id': req.params.id
        }
    }).then(result => {
        if (result) {
            return next()
        } else {
            return next({
                name: 'Unauthorized'
            })
        }
    }).catch(err => next(err))

}