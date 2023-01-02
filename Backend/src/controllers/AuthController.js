const bcrypt = require("bcryptjs")

const { generateToken } = require("../helpers/jwtUtils")

// Models
const User = require("../models/User")

module.exports = class AuthController {
  static async register(req, res) {
    try {
      const { name, email, password, confirm_password } = req.body

      const emptyFields = !name || !email || !password || !confirm_password
      if (emptyFields) return res.status(400).json({ error: "Preencha todos os campos para continuar" })

      const existsEmail = await User.findOne({ where: { email } })
      if (existsEmail) return res.status(400).json({ error: "O email informado já está em uso" })

      const passwordsMatch = password === confirm_password
      if (!passwordsMatch) return res.status(400).json({ error: "As senhas não conferem" })

      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(password, salt)

      const user = {
        name,
        email,
        password: hashedPassword
      }

      // Create user
      const createdUser = await User.create(user)

      // Generate token
      const token = await generateToken({ id: createdUser, email })

      res.status(200).json({ user: createdUser, token })
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}