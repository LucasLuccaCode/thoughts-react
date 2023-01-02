require("dotenv").config()

const jwt = require("jsonwebtoken")

exports.generateToken = (payload) => jwt.sign(payload, process.env.TOKEN_SECRET)