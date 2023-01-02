const { Router } = require("express")
const router = Router()

// Middleware
const verifyToken = require("../middlewares/checkTokenMiddleware")

// Controller
const ThoughtController = require("../controllers/ThoughtController")

router.post("/", verifyToken, ThoughtController.create)

module.exports = router