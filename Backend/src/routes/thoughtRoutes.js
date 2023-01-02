const { Router } = require("express")
const router = Router()

// Middleware
const verifyToken = require("../middlewares/checkTokenMiddleware")

// Controller
const ThoughtController = require("../controllers/ThoughtController")

router.route("/")
  .get(ThoughtController.getThoughts)
  .post(verifyToken, ThoughtController.create)

router.route("/:thoughtId")
  .put(verifyToken, ThoughtController.update)

module.exports = router