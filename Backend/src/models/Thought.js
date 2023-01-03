const { DataTypes, Model } = require("sequelize")

// Connection
const sequelize = require("../db/connection")

// Other models
const User = require("./User")

class Thought extends Model {
  static async like(userId, postId) {
    // Adiciona um registro à tabela de curtidas
    await sequelize.query(
      `INSERT INTO likes (userId, postId) VALUES (:userId, :postId)`,
      { replacements: { userId, postId } }
    );
  }

  static async unlike(userId, postId) {
    // Remove o registro correspondente da tabela de curtidas
    await sequelize.query(
      `DELETE FROM likes WHERE userId = :userId AND postId = :postId`,
      { replacements: { userId, postId } }
    );
  }
}

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

module.exports = Thought