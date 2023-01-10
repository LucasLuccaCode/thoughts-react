const { DataTypes, Model } = require("sequelize")

// Connection
const sequelize = require("../db/connection")

// Other models
const User = require("./User")

class Thought extends Model { }

Thought.init({
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "thought"
})

// Associations
User.hasMany(Thought, {
  foreignKey: "userId",
  as: "thoughts",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})
Thought.belongsTo(User, {
  foreignKey: "userId",
  as: "author"
})

module.exports = Thought