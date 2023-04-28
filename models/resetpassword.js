"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class resetpassword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  resetpassword.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      token: DataTypes.STRING,
      expiresAt: DataTypes.DATE,
      is_used: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "resetpassword",
    }
  );

  resetpassword.associate = function (models) {};

  return resetpassword;
};
