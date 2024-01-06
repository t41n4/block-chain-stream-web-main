const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User_Favorites', {
    label_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Labels',
        key: 'label_id'
      }
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'User_Favorites',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "label_id" },
          { name: "user_id" },
        ]
      },
      {
        name: "label_id",
        using: "BTREE",
        fields: [
          { name: "label_id" },
        ]
      },
      {
        name: "fk_user_fav",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
