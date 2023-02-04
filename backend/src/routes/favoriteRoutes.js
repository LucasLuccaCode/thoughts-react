const { Router } = require("express")
const router = Router()

// Middleware
const verifyToken = require("../middlewares/checkTokenMiddleware")

// Controller
const FavoriteController = require("../controllers/FavoriteController")

router.get("/favorites", verifyToken, FavoriteController.getFavoritesByUser)

router.route("/favorite")
  .post(verifyToken, FavoriteController.toggleFavorite)

module.exports = router