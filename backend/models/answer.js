"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Answer.belongsTo(models.Alumni);
      Answer.belongsTo(models.Question);
    }
  }
  Answer.init(
    {
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      alumni_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      answer: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Text is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Answer",
    }
  );
  return Answer;
};
