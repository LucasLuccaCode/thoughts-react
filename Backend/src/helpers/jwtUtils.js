require("dotenv").config()

const jwt = require("jsonwebtoken")

exports.generateToken = async (payload) => await jwt.sign(payload, process.env.TOKEN_SECRET)