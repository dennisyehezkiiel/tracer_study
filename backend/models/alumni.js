"use strict";
const { Model } = require("sequelize");
const { createHash } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Alumni extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Alumni.belongsTo(models.Major, { foreignKey: "major_id" });
      Alumni.belongsTo(models.Year, { foreignKey: "year_id" });
      Alumni.belongsTo(models.Role, { foreignKey: "role_id" });
      Alumni.belongsToMany(models.Question, { through: models.Answer });
    }
  }
  Alumni.init(
    {
      fullname: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your fullname",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your password",
          },
          len: {
            args: [5],
            msg: "Password minimum length is 5",
          },
        },
      },
      born_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your born date",
          },
        },
      },
      nik: {
        type: DataTypes.STRING,
        unique: { args: true, msg: "Incorrect NIK" },
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your NIK",
          },
          len: {
            args: [16],
            msg: "NIK incorrect, minimum length is 16",
          },
        },
      },
      nim: {
        type: DataTypes.STRING,
        unique: { args: true, msg: "Incorrect NIM" },
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your NIM",
          },
          len: {
            args: [10],
            msg: "NIM incorrect, minimum length is 10",
          },
        },
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your address",
          },
        },
      },
      major_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please choose your major",
          },
        },
      },
      telephone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your telephone number",
          },
        },
      },
      year_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please select your graduate year",
          },
        },
      },
      role_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Alumni",
    }
  );
  Alumni.beforeCreate((alumni, option) => {
    const newPassword = createHash(alumni.password);
    alumni.password = newPassword;
  });
  return Alumni;
};
