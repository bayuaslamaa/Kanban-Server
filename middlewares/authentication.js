const { verify } = require("../helpers/jwt")
const { User } = require("../models/index")

module.exports = (req, res, next) => {
    try {
        let decoded = verify(req.headers.access_token)
        User.findOne({
            where: {
                'id': decoded.id
            }
        })
        .then(result => {
            if (result) {
                // console.log('SUKSES',result)
                // console.log('ID', req.params.id)
                    req.currentUserId = result.id
                    // req.currentProjectId = req.headers.ProjectId
                    return next()
                } else {
                    return next({
                        name: 'Unauthorized'
                    })
                }
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    } catch (error) {
        return next(error)
    }

}