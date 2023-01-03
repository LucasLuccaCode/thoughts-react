const { Router } = require("express")
const router = Router()

// Middleware
const verifyToken = require("../middlewares/checkTokenMiddleware")

// Controller
const CommentController = require("../controllers/CommentController")

router.route("/:thoughtId/comments/")
  .post(verifyToken, CommentController.create)

module.exports = router