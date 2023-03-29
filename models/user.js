'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    user.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
        gender: DataTypes.STRING,
        password: { type: DataTypes.STRING, allowNull: false },
        address_id: { type: DataTypes.UUID, allowNull: false },
        role_id: { type: DataTypes.UUID, allowNull: false }
    }, {
        sequelize,
        modelName: 'user',
    }, );

    user.associate = function(models) {

    }

    return user;
};