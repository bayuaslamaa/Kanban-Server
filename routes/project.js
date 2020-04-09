const router = require("express").Router()
const authentication = require("../middlewares/authentication")
const ProjectController = require("../controllers/ProjectController")
const authorization = require("../middlewares/authorization")

router.use(authentication)
router.get("/", ProjectController.getAll)
router.post("/", ProjectController.create)
router.delete("/:id", authorization, ProjectController.delete)

// router.post("/task", ProjectController.addTask)


module.exports = router