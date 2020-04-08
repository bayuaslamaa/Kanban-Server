const router = require("express").Router()
const TaskController = require("../controllers/TaskController")
const auth = require("../middlewares/authentication")

router.use(auth)
router.get("/", TaskController.getAll)
router.post("/", TaskController.create)
router.delete("/:id", TaskController.delete)

module.exports = router