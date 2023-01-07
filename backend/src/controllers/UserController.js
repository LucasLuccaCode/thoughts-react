const User = require("../models/User")
const Thought = require("../models/Thought")

module.exports = class UserController {
  static async getById(req, res) {
    try {
      const userId = Number(req.params.userId)
      const tokenUserId = req.user.id

      if (userId !== tokenUserId) return res.status(401).json({ error: "Acesso negado!" })

      const user = await User.findByPk(tokenUserId, {
        attributes: ['id', 'name', 'email'],
        include: {
          model: Thought,
          as: "thoughts"
        }
      })

      res.status(200).json({
        error: null,
        user
      })
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}