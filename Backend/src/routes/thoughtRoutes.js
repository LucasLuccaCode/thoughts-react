const { Router } = require("express")
const router = Router()

// Middleware
const verifyToken = require("../middlewares/checkTokenMiddleware")

// Controller
const ThoughtController = require("../controllers/ThoughtController")

router.route("/")
  .get(ThoughtController.getThoughts)
  .post(verifyToken, ThoughtController.create)

module.exports = router