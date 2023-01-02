require("dotenv").config()

const { Sequelize } = require("sequelize")

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
)

try {
  connection.authenticate()
  console.log(`Conexão estabelecida com o banco de dados`)
} catch (error) {
  console.log("Erro ao se conectar o banco de dados ", error)
}

module.exports = connection