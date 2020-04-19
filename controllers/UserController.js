const { User, UserProject } = require("../models/index")
const { encryptPassword, decryptPassword } = require("../helpers/bcrypt")
const { generateToken, verify } = require("../helpers/jwt")
const { OAuth2Client } = require('google-auth-library');


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

    static googleSign(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email = ''
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID
        }).then(ticket => {
            // console.log('ini tiket', ticket)
            email = ticket.getPayload().email
            return User.findOne({
                where: {
                    "email": email
                }
            })
        }).then(data => {
            console.log(data.password);

            if (data) {
                let payload = {
                    id: data.id,
                    email: data.email
                }
                let access_token = generateToken(payload)
                return res.status(200).json({
                    id: data.id,
                    email: data.email,
                    access_token
                })
            } else {
                return User.create({
                    email,
                    password: 'default'
                })
            }
        }).then(data => {
            let payload = {
                id: data.id,
                email: data.email
            }
            let access_token = generateToken(payload)
            return res.status(201).json({
                id: data.id,
                email: data.email,
                access_token
            })
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

                res.status(201).json({
                    id: payload.id,
                    email: payload.email
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    //endpoint untuk menambahkan user pada setiap project di client
    static getUsers(req, res, next) {
        User.findAll()
            .then(result => {
                let data = []
                for (let i = 0; i < result.length; i++) {
                    data.push({
                        id: result[i].id,
                        email: result[i].email
                        //password tidak ditampilkan untuk urusan keamanan
                    })
                }
                return res.status(200).json({
                    users: data
                })
                console.log(data)
            })
            .catch(err => next(err))
    }
    static addContributor(req, res, next) {
        const { ProjectId, UserId } = req.body
        let newUserProject = { ProjectId, UserId }
        UserProject.create(newUserProject)
            .then(result => {
                return res.status(201).json({
                    id: result.id,
                    ProjectId: result.ProjectId,
                    UserId: result.UserId
                })
            })
            .catch(err => next(err))
    }
    static quitProject(req, res, next) {
        const { ProjectId } = req.body
        let id = req.currentUserId
        UserProject.destroy({
            where: {
                'ProjectId': ProjectId,
                'UserId': id
            }
        }).then(data => {
            res.status(200).json({
                msg: `User with id ${id} success quit the project with ProjectId: ${ProjectId}`
            })
        })
            .catch(err => next(err))
    }
}

module.exports = UserController