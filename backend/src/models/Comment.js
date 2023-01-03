const { DataTypes, Model } = require("sequelize")

// Connection
const sequelize = require("../db/connection")

// Models 
const User = require("./User")
const Thought = require("./Thought")

class Comment extends Model { }

Comment.init({
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  thoughtId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: "comment"
})

// Associations
User.hasMany(Comment)
Comment.belongsTo(User, {
  foreignKey: "userId",
  as: "author"
})

Thought.hasMany(Comment, {
  foreignKey: "thoughtId",
  as: "comments",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})
Comment.belongsTo(Thought, {
  foreignKey: "thoughtId",
  as: "thought"
})

module.exports = Comment