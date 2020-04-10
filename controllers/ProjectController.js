const { Project, UserProject, Task } = require("../models/index")

class ProjectController {
    static getAll(req, res, next) {
        UserProject.findAll({
            include: [{
                model: Project,
                include: [Task]
            }
            ],
            where: {
                UserId: req.currentUserId
            }
        })
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
        let created = {}
        Project.create(newProject)
            .then(result => {
                const { id, title, UserId } = result
                created = {
                    id,
                    title,
                    UserId
                }
                return UserProject.create({
                    ProjectId: id,
                    UserId
                })
            })
            .then(data => {
                // console.log(data)
                return res.status(201).json({
                    id: created.id,
                    title: created.title,
                    UserId: created.UserId,
                    UserProjectId: data.id
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