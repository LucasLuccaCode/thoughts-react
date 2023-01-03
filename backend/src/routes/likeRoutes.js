const { Router } = require("express")
const router = Router()

// Middleware
const verifyToken = require("../middlewares/checkTokenMiddleware")

// Controller
const LikeController = require("../controllers/LikeController")

router.route("/:thoughtId/all")
  .get(verifyToken, LikeController.getAll)

router.route("/:thoughtId/like")
  .post(verifyToken, LikeController.toggleLike)

module.exports = router