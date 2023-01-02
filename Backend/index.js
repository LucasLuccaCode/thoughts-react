const express = require("express")

// Settings
const app = express()
const PORT = 3000

// Connection with database
const connection = require("./src/db/connection")

// Models
const User = require("./src/models/User")
const Thought = require("./src/models/Thought")

// Handle with form data and json
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes 
app.get("/", (req, res) => {
  res.json({ hello: "world" })
})

app.use("*", (req, res) => {
  res.json({ error: "Route not found" })
})

// Start server
connection
  .sync()
  .then(() => app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)))