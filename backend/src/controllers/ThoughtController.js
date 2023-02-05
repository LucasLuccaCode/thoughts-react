// Models
const { Op } = require("sequelize")
const Thought = require("../models/Thought")

module.exports = class ThoughtController {
  static async create(req, res) {
    try {
      const { content } = req.body
      const userId = Number(req.body.userId)
      const tokenUserId = req.user.id

      if (!content) return res.status(400).json({ error: "Escreva algo para publicar" })

      const userIdsMatch = tokenUserId === userId
      if (!userIdsMatch) return res.status(401).json({ error: "Acesso negado!" })

      const thought = {
        content: content.trim(),
        userId
      }

      const createdThought = await Thought.create(thought)

      res.status(200).json({
        error: null,
        message: "Pensamento publicado",
        thought: createdThought
      })
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  static async getThoughts(req, res) {
    try {
      const { search, order } = req.query
      const query = `%${search || ""}%`
      const orderBy = order === "old" ? "ASC" : "DESC"

      const thoughts = await Thought.findAll({
        where: {
          content: {
            [Op.like]: query
          }
        },
        include: [
          {
            association: "author",
            attributes: ['name', 'avatar']
          },
          {
            association: "likes",
            attributes: ['userId']
          },
          {
            association: "comments",
            attributes: { exclude: ['updatedAt'] },
            include: {
              association: "author",
              attributes: ['name']
            }
          },
          {
            association: 'fans',
            attributes: ['id'],
            through: {
              attributes: []
            },
          }
        ],
        order: [["createdAt", orderBy]]
      })

      res.status(200).json({
        error: null,
        thoughts
      })
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  static async getById(req, res) {
    try {
      const { thoughtId } = req.params

      const thought = await Thought.findByPk(thoughtId, {
        include: [
          {
            association: 'author'
          },
          {
            association: 'comments',
            include: {
              association: 'author'
            }
          }
        ]
      })
      if (!thought) return res.status(400).json({ error: "Pensamento não encontrado" })

      res.status(200).json({
        error: null,
        thought
      })
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  static async update(req, res) {
    try {
      const { content } = req.body
      const { thoughtId } = req.params
      const userId = Number(req.body.userId)
      const tokenUserId = req.user.id

      if (!content) return res.status(400).json({ error: "Escreva algo para atualizar" })

      const userIdsMatch = tokenUserId === userId
      if (!userIdsMatch) return res.status(401).json({ error: "Acesso negado!" })

      const thought = await Thought.findOne({ where: { id: thoughtId, userId } })
      if (!thought) return res.status(400).json({ error: "Pensamento não encontrado" })

      const updatedThought = await thought.update({ content: content.trim() })

      res.status(200).json({
        error: null,
        message: "Pensamento atualizado com sucesso",
        thought: updatedThought
      })
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  static async delete(req, res) {
    try {
      const { thoughtId } = req.params
      const tokenUserId = req.user.id

      const status = await Thought.destroy({ where: { id: thoughtId, userId: tokenUserId } })

      if (!status) return res.status(400).json({ error: "Pensamento não encontrado" })

      res.status(200).json({
        error: null,
        message: "Pensamento deletado com sucesso"
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
  }
}