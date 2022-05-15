"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Year extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Year.hasMany(models.alumni, { foreignKey: "year_id" });
    }
  }
  Year.init(
    {
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Year is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Year",
    }
  );
  return Year;
};
