const { Model, DataTypes } = require("sequelize")

// Connection
const sequelize = require("../db/connection")

// Models 
const User = require("./User")
const Thought = require("./Thought")

class Favorite extends Model { }

Favorite.init({
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
  modelName: 'favorite'
});

// Associations
User.belongsToMany(Thought, {
  through: Favorite,
  as: 'favorites'
});

Thought.belongsToMany(User, {
  through: Favorite,
  as: 'fans',
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

module.exports = Favorite