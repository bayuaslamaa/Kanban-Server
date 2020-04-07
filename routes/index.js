const router = require("express").Router()
const userRoutes = require("./user")


router.get("/", (req, res) => {
    res.send("welcome to my humble app")
})

router.use(userRoutes)



module.exports = router