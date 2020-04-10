const router = require("express").Router()
const TaskController = require("../controllers/TaskController")
const auth = require("../middlewares/authentication")
const authorization = require("../middlewares/taskAuth")

router.use(auth)
router.get("/", TaskController.getAll)
router.post("/", TaskController.create)

// router.use(auhorization)
router.put("/:id", authorization, TaskController.update)
router.delete("/:id", authorization, TaskController.delete)

module.exports = router