// Models
const Thought = require("../models/Thought")

module.exports = class ThoughtController {
  static async create(req, res) {
    const { content } = req.body
    const userId = Number(req.body.userId)
    const tokenUserId = req.user.id

    try {
      const userIdsMatch = tokenUserId === userId
      if (!userIdsMatch) return res.status(401).json({ error: "Acesso negado!" })

      const thought = {
        content,
        userId
      }

      const createdThought = await Thought.create(thought)

      res.status(200).json({
        error: null,
        message: "Pensamento postado",
        thought: createdThought
      })
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  static async getThoughts(req, res) {
    try {
      const thoughts = await Thought.findAll()

      res.status(200).json({
        error: null,
        thoughts
      })
    } catch (error) {
      res.stats(500).json({ error })
    }
  }

  static async update(req, res) {
    const { content } = req.body
    const { thoughtId } = req.params
    const userId = Number(req.body.userId)
    const tokenUserId = req.user.id

    try {
      const userIdsMatch = tokenUserId === userId
      if (!userIdsMatch) return res.status(401).json({ error: "Acesso negado!" })

      const thought = await Thought.findOne({ where: { id: thoughtId, userId } })
      if (!thought) res.status(400).json({ error: "Pensamento não encontrado" })

      const updatedThought = await thought.update({ content })

      res.status(200).json({
        error: null,
        message: "Pensamento atualizado",
        thought: updatedThought
      })
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}