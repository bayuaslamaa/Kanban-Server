const { Project } = require("../models/index")

class ProjectController {
    static getAll(req, res, next) {
        Project.findAll()
            .then(result => {
                res.status(200).json({
                    projects: result
                })
            })
            .catch(err => next(err))
    }

    static create(req, res, next) {
        let newProject = {
            title: req.body.title,
            UserId: req.currentUserId
        }
        Project.create(newProject)
            .then(result => {
                const { id, title, UserId } = result
                return res.status(201).json({
                    id,
                    title,
                    UserId
                })
            })
            .catch(err => next(err))
    }

    static delete(req, res, next) {
        let id = req.params.id
        Project.destroy({
            where: {
                'id': id
            }
        }).then(data => {
            // console.log(data)
            res.status(200).json({
                msg: `success deleting projects  with id: ${id}`
            })
        })
            .catch(err => next(err))
    }
}


module.exports = ProjectController