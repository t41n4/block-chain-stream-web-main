const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Likes', {
    like_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    like_user: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    like_video: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'Videos',
        key: 'video_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Likes',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "like_id" },
        ]
      },
      {
        name: "fk_like_user",
        using: "BTREE",
        fields: [
          { name: "like_user" },
        ]
      },
      {
        name: "fk_like_video",
        using: "BTREE",
        fields: [
          { name: "like_video" },
        ]
      },
    ]
  });
};
