const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comments', {
    comment_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    comment_content: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    comment_user: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    comment_video: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'Videos',
        key: 'video_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Comments',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "comment_id" },
        ]
      },
      {
        name: "fk_user_comment",
        using: "BTREE",
        fields: [
          { name: "comment_user" },
        ]
      },
      {
        name: "fk_video_comment",
        using: "BTREE",
        fields: [
          { name: "comment_video" },
        ]
      },
    ]
  });
};
