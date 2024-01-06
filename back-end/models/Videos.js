const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Videos', {
    video_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    video_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    video_type: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    video_label: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    video_owner: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    video_views: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    video_status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    video_thumbnail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    video_urls: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Videos',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "video_id" },
        ]
      },
      {
        name: "video_id",
        using: "BTREE",
        fields: [
          { name: "video_id" },
        ]
      },
      {
        name: "fk_video_owner",
        using: "BTREE",
        fields: [
          { name: "video_owner" },
        ]
      },
    ]
  });
};
