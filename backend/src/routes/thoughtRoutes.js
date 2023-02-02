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
  .get(ThoughtController.getById)
  .put(verifyToken, ThoughtController.update)
  .delete(verifyToken, ThoughtController.delete)

module.exports = router