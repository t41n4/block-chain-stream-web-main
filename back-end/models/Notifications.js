const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Notifications', {
    notification_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    notification_content: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    notification_redirect: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    notification_user: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Notifications',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "notification_id" },
        ]
      },
      {
        name: "fk_notify_user",
        using: "BTREE",
        fields: [
          { name: "notification_user" },
        ]
      },
    ]
  });
};
