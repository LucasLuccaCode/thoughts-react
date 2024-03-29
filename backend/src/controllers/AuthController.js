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
      await User.create(user)

      res.status(200).json({
        error: null,
        message: "Conta criada com sucesso"
      })
    } catch (error) {
      res.status(500).json({ error })
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body

      const emptyFields = !email || !password
      if (emptyFields) return res.status(400).json({ error: "Preencha todos os campos para continuar" })

      const user = await User.findOne({ where: { email } })
      if (!user) return res.status(401).json({ error: "Usuário e/ou senha inválidos!" })

      const passwordMatch = bcrypt.compareSync(password, user.password)
      if (!passwordMatch) return res.status(401).json({ error: "Usuário e/ou senha inválidos!" })

      // Generate token
      const token = generateToken({ id: user.id, email })

      res.status(200).json({
        error: null,
        message: "Login realizado com sucesso",
        user: {
          id: user.id,
          name: user.name
        },
        token
      })
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}