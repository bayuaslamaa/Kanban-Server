const { Task, Project } = require("../models/index")

class TaskController {
    static getAll(req, res, next) {
        Task.findAll({
            where: {
                'ProjectId': req.headers.ProjectId
            }
        })
            .then(result => {
                console.log(result)
                return res.status(200).json({
                    tasks: result
                })

            }).catch(err => {
                return next(err)
            })
    }
    static create(req, res, next) {
        const {
            title,
            ProjectId
        } = req.body
        let newData = {
            title,
            ProjectId
        }
        Project.findOne({
            where: {
                'UserId': req.currentUserId
            }
        }).then(() => {
            return Task.create(newData)
        }).then(result => {
            const {
                id,
                title,
                category,
                ProjectId
            } = result
            res.status(201).json({
                id,
                title,
                category,
                ProjectId
            })
        }).catch(err => next(err))
    }

    static delete(req, res, next) {
        let id = req.params.id
        Task.destroy({
            where: {
                'id': id
            }
        }).then(result => {
            return res.status(200).json({
                msg: `success deleting task with id: ${id}`
            })
        }).catch(err => {
            return next(err)
        })
    }

    static update(req, res, next) {
        let id = req.params.id
        Task.update({
            category: req.body.category
        }, {
            where: {
                'id': id
            }
        }).then(result => {
            const {
                id,
                title,
                category,
                ProjectId
            } = result
            res.status(201).json({
                id,
                title,
                category,
                ProjectId
            })
        }).catch(err => next(err))
    }
}

module.exports = TaskController