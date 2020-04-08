const { User } = require("../models/index")
const { encryptPassword, decryptPassword } = require("../helpers/bcrypt")
const { generateToken, verify } = require("../helpers/jwt")

class UserController {
    static login(req, res, next) {
        const { email, password } = req.body
        let user = {
            email,
            password
        }
        User.findOne({
            where: {
                'email': user.email
            }
        }).then(result => {
            if (result) {
                let compare = decryptPassword(user.password, result.password)
                // console.log(compare)
                if (compare) {
                    let payload = {
                        id: result.id,
                        email: result.email
                    }
                    return res.status(200).json({
                        id: payload.id,
                        email: payload.email,
                        access_token: generateToken(payload)
                    })
                } else {
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
            return next(err)
        })
    }
    static register(req, res, next) {
        let { email, password } = req.body
        password = encryptPassword(password)
        let newUser = {
            email,
            password
        }
        User.create(newUser)
            .then(result => {
                // console.log(result)
                let payload = {
                    id: result.id,
                    email: result.email
                }
                let token = generateToken(payload)

                res.status(201).json({
                    id: payload.id,
                    email: payload.email,
                    access_token: token
                })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = UserController