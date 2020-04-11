const router = require("express").Router()
const UserController = require("../controllers/UserController")
const auth = require("../middlewares/authentication")

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.post("/googleSign", UserController.googleSign)

router.get("/users", auth, UserController.getUsers)
router.post("/contributors", auth, UserController.addContributor)
router.delete("/contributors", auth, UserController.quitProject)

module.exports = router