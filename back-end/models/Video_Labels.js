const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Video_Labels', {
    label_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Labels',
        key: 'label_id'
      }
    },
    video_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Videos',
        key: 'video_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Video_Labels',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "label_id" },
          { name: "video_id" },
        ]
      },
      {
        name: "fk_label_video",
        using: "BTREE",
        fields: [
          { name: "video_id" },
        ]
      },
    ]
  });
};
