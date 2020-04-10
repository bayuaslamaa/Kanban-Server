const router = require("express").Router()
const userRoutes = require("./user")
const projectRoutes = require("./project")
const taskRoutes = require("./task")


router.get("/", (req, res) => {
    res.send("welcome to my humble app")
})

router.use(userRoutes)
router.use("/projects", projectRoutes)
router.use("/tasks", taskRoutes)


module.exports = router