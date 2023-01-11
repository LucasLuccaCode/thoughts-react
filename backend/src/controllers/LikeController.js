// Models
const Like = require("../models/Like")
const Thought = require("../models/Thought")

// Connection
const sequelize = require("../db/connection")

module.exports = class LikeController {
  static async getAll(req, res) {
    try {
      const thoughtId = Number(req.params.thoughtId)

      const result = await Thought.findAll({
        attributes: ['id', 'content', [sequelize.fn('COUNT', '*'), 'count']],
        include: [
          {
            model: Like,
            as: "likes",
            attributes: []
          }
        ],
        group: ['id', 'content']
      });

      res.status(200).json(result)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
  }

  static async toggleLike(req, res) {
    try {
      const { thoughtId } = req.params
      const { id: userId } = req.user

      const [like, created] = await Like.findOrCreate({
        where: {
          userId,
          thoughtId
        }
      })

      if (!created) {
        await like.destroy()
      }

      res.status(200).json({ like, statusLike: created })
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}