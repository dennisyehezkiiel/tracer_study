"use strict";
const { Model } = require("sequelize");
const { createHash } = require('../helpers/bcrypt.js')
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.belongsTo(models.Role, { foreignKey: "role_id" });
    }
  }
  Admin.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Admin name is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Admin password is required",
          },
        },
      },
      role_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );
  Admin.beforeCreate((admin, option) => {
    const newPassword = createHash(admin.password);
    admin.password = newPassword;
  });
  return Admin;
};
