const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "username_unique"
    },
    user_fullname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "email_unique"
    },
    user_stream_key: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_role: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    user_avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_wallet_address: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "username_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "email_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_email" },
        ]
      },
    ]
  });
};
