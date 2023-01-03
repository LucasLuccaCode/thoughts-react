const { Router } = require("express")
const router = Router()

// Middleware
const verifyToken = require("../middlewares/checkTokenMiddleware")

// Controller
const CommentController = require("../controllers/CommentController")

router.route("/:thoughtId/comments/")
  .post(verifyToken, CommentController.create)

router.route("/:thoughtId/comments/:commentId")
  .delete(verifyToken, CommentController.delete)
  
module.exports = router