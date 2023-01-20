const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

// Settings
const app = express()
const PORT = 3000

// Connection with database
const connection = require("./src/db/connection")

// Models
const User = require("./src/models/User")
const Thought = require("./src/models/Thought")
const Comment = require("./src/models/Comment")
const Like = require("./src/models/Like")

// Handle with form data and json
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

// Routes 
const authRoutes = require("./src/routes/authRoutes")
app.use("/", authRoutes)

const userRoutes = require("./src/routes/userRoutes")
app.use("/users", userRoutes)

const thoughtRoutes = require("./src/routes/thoughtRoutes")
app.use("/thoughts", thoughtRoutes)

const commentRoutes = require("./src/routes/commentRoutes")
app.use("/thoughts", commentRoutes)

const likeRoutes = require("./src/routes/likeRoutes")
app.use("/thoughts", likeRoutes)

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