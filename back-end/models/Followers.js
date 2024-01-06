const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Followers', {
    follower_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    following_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    follow_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'Followers',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "follow_id" },
        ]
      },
      {
        name: "follower_id",
        using: "BTREE",
        fields: [
          { name: "follower_id" },
        ]
      },
      {
        name: "fk_following",
        using: "BTREE",
        fields: [
          { name: "following_id" },
        ]
      },
    ]
  });
};
