// Models
const Thought = require("../models/Thought")

module.exports = class ThoughtController {
  static async create(req, res) {
    const { content } = req.body
    const userId = Number(req.body.userId)
    const tokenUserId = req.user.id
    
    try {
      const userIdsMatch = tokenUserId === userId
      if(!userIdsMatch) return res.status(401).json({ error: "Acesso negado!"})

      const thought = {
        content, 
        userId
      }

      const createdThought = await Thought.create(thought)
      
      res.status(200).json(createdThought)
    } catch(error){
      res.status(500).json({ error })
    }
  }
}