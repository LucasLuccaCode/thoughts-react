const { Router } = require("express")
const router = Router()

// Middleware
const verifyToken = require("../middlewares/checkTokenMiddleware")

// Controller
const UserController = require("../controllers/UserController")

router.get("/:userId", verifyToken, UserController.getById)


module.exports = router