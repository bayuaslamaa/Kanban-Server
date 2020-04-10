const router = require("express").Router()
const userRoutes = require("./user")
const projectRoutes = require("./project")
const auth = require("../middlewares/authentication")
const taskRoutes = require("./task")


// router.get("/", auth, (req, res) => {
//     res.send("welcome to my humble app")
// })

router.use(userRoutes)
router.use("/projects", projectRoutes)
router.use("/tasks", taskRoutes)


module.exports = router