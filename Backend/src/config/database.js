require("dotenv").config()

module.exports = {
  development: {
    "host": process.env.DB_HOST,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "dialect": process.env.DB_DIALECT,
    "database": process.env.DB_NAME
  }
}