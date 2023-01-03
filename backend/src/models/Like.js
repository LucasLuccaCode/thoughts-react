const { Model, DataTypes } = require("sequelize")

// Connection
const sequelize = require("../db/connection")

// Models 
const User = require("./User")
const Thought = require("./Thought")

class Like extends Model { }

Like.init({
  thoughtId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "like"
})

// Associations
User.hasMany(Like)
Like.belongsTo(User, {
  foreignKey: "userId",
  as: "author"
})

Thought.hasMany(Like, {
  foreignKey: "thoughtId",
  as: "likes",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})
Like.belongsTo(Thought, {
  foreignKey: "thoughtId",
  as: "thought"
})

module.exports = Like