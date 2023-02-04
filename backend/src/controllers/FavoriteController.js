// Models
const Favorite = require("../models/Favorite");
const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = class FavoriteController {
  static async toggleFavorite(req, res) {
    try {
      const { userId, thoughtId } = req.body

      const [favorite, created] = await Favorite.findOrCreate({
        where: { userId, thoughtId }
      });

      if (!created) {
        await favorite.destroy();
      }

      res.status(200).json({
        error: null,
        message: 'Favoritos alternado',
        created
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
  }

  static async getFavoritesByUser(req, res) {
    try {
      const { id: userId } = req.user

      const user = await User.findByPk(userId, {
        include: [{
          model: Thought,
          attributes: ['id', 'content'],
          as: 'favorites',
          through: { attributes: [] }
        }],
      });
  
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      return res.status(200).json({
        error: null,
        favorites: user.favorites
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
  }
}