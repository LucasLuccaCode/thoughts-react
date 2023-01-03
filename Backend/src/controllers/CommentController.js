// Models
const Comment = require("../models/Comment")

module.exports = class ThoughtController {
  static async create(req, res) {
    const { content } = req.body
    const userId = Number(req.body.userId)
    const { thoughtId } = req.params
    const tokenUserId = req.user.id


    try {
      const userIdsMatch = tokenUserId === userId
      if (!userIdsMatch) return res.status(401).json({ error: "Acesso negado!" })

      const comment = {
        content,
        userId,
        thoughtId
      }

      const createdComment = await Comment.create(comment)

      res.status(200).json({
        error: null,
        message: "Comentário postado com sucesso",
        comment: createdComment
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
  }
}