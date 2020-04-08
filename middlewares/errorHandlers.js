
module.exports = (err, req, res, next) => {

    switch (err.name) {

        case "JsonWebTokenError":
            res.status(401).json({
                status: 401,
                name: 'Unauthorized',
                message: err.message
            })
            break;
        case "SequelizeUniqueConstraintError":
            let bugs = []
            for (let i = 0; i < err.errors.length; i++) {
                bugs.push(err.errors[i].message)
console.log(bugs)
            }
            res.status(400).json({
                status: 400,
                name: 'BadRequest',
                message: bugs
            })
            break;
        case "Unauthorized":
            res.status(401).json({
                status: 401,
                name: 'Unauthorized',
                message: err.message
            })
            break;

        default:
            res.status(500).json({
                status: 500,
                err
            })
            break;
    }
}